import React, {
  useRef, useEffect, useCallback, useState, forwardRef,
} from 'react'
import {
  Stage, Layer, Rect, Text, Image as KImage, Transformer,
} from 'react-konva'

const STAGE_SIZE = 512   // tamanho lógico da textura (512×512 px)

// ─── Nó de Texto (forwardRef para o Transformer) ──────────────────────────────
const KonvaText = forwardRef(function KonvaText(
  { el, onSelect, onChange, onUpdate },
  ref,
) {
  return (
    <Text
      ref={ref}
      x={el.x}
      y={el.y}
      text={el.text}
      fontSize={el.fontSize ?? 36}
      fontFamily="Poppins, sans-serif"
      fontStyle="bold"
      fill={el.fill ?? '#FFFFFF'}
      shadowColor="rgba(0,0,0,0.7)"
      shadowBlur={4}
      shadowOffsetX={1}
      shadowOffsetY={1}
      shadowEnabled
      rotation={el.rotation ?? 0}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onUpdate}
      onDragEnd={(e) => {
        onChange({ x: e.target.x(), y: e.target.y() })
        onUpdate()
      }}
      onTransformEnd={(e) => {
        const node = e.target
        const newFontSize = Math.max(8, Math.round((el.fontSize ?? 36) * node.scaleX()))
        node.scaleX(1)
        node.scaleY(1)
        onChange({ x: node.x(), y: node.y(), fontSize: newFontSize, rotation: node.rotation() })
        onUpdate()
      }}
    />
  )
})

// ─── Nó de Imagem (carrega src via useEffect) ─────────────────────────────────
const KonvaImage = forwardRef(function KonvaImage(
  { el, onSelect, onChange, onUpdate },
  ref,
) {
  const [img, setImg] = useState(null)

  useEffect(() => {
    if (!el.src) return
    const image = new window.Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => setImg(image)
    image.src = el.src
  }, [el.src])

  return (
    <KImage
      ref={ref}
      image={img}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation ?? 0}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onUpdate}
      onDragEnd={(e) => {
        onChange({ x: e.target.x(), y: e.target.y() })
        onUpdate()
      }}
      onTransformEnd={(e) => {
        const node = e.target
        const newW = Math.max(10, el.width  * node.scaleX())
        const newH = Math.max(10, el.height * node.scaleY())
        node.scaleX(1)
        node.scaleY(1)
        onChange({ x: node.x(), y: node.y(), width: newW, height: newH, rotation: node.rotation() })
        onUpdate()
      }}
    />
  )
})

// ─── Editor principal ─────────────────────────────────────────────────────────
export default function KonvaEditor({
  shirtColor,
  elements,
  selectedId,
  onSelect,
  onElementChange,
  onCanvasReady,
  onDeleteSelected,
}) {
  const stageRef     = useRef()
  const dataLayerRef = useRef()   // layer de dados — exportada para a textura
  const trRef        = useRef()
  const nodeMap      = useRef({})   // id → Konva node
  const containerRef = useRef()
  const [stageWidth, setStageWidth] = useState(320)

  // Redimensiona a Stage de acordo com o container
  useEffect(() => {
    if (!containerRef.current) return
    const update = () => {
      const w = containerRef.current?.offsetWidth || 320
      setStageWidth(w)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const scale = stageWidth / STAGE_SIZE

  // Acopla o Transformer ao nó selecionado
  useEffect(() => {
    if (!trRef.current) return
    const node = selectedId ? nodeMap.current[selectedId] : null
    trRef.current.nodes(node ? [node] : [])
    trRef.current.getLayer()?.batchDraw()
  }, [selectedId, elements])

  // Exporta apenas a layer de dados (sem Transformer) — 512×512
  const exportCanvas = useCallback(() => {
    if (!dataLayerRef.current) return
    // Força redesenho síncrono antes de capturar
    dataLayerRef.current.draw()
    const canvas = dataLayerRef.current.toCanvas({ pixelRatio: 2 / scale })
    onCanvasReady(canvas)
  }, [onCanvasReady, scale])

  // Re-exporta quando a cor da camisa muda
  useEffect(() => {
    exportCanvas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shirtColor])

  // Callback-ref: armazena o nó Konva no mapa para o Transformer
  const makeNodeRef = useCallback(
    (id) => (node) => { nodeMap.current[id] = node },
    [],
  )

  // Tecla Delete/Backspace remove elemento selecionado
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        if (document.activeElement?.tagName !== 'INPUT' &&
            document.activeElement?.tagName !== 'TEXTAREA') {
          onDeleteSelected(selectedId)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedId, onDeleteSelected])

  return (
    <div ref={containerRef} className="w-full select-none">
      {/* Barra de contexto quando há seleção */}
      {selectedId && (
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            Elemento selecionado
          </span>
          <button
            onClick={() => onDeleteSelected(selectedId)}
            className="text-xs text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remover
          </button>
        </div>
      )}

      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageWidth}
        scaleX={scale}
        scaleY={scale}
        style={{ cursor: selectedId ? 'move' : 'default', borderRadius: '12px', overflow: 'hidden' }}
        onMouseDown={(e) => { if (e.target === e.target.getStage()) onSelect(null) }}
        onTouchStart={(e) => { if (e.target === e.target.getStage()) onSelect(null) }}
      >
        {/* Layer de dados — exportada para textura (sem Transformer) */}
        <Layer ref={dataLayerRef}>
          <Rect
            width={STAGE_SIZE}
            height={STAGE_SIZE}
            fill={shirtColor}
            onClick={() => onSelect(null)}
            onTap={() => onSelect(null)}
          />
          {elements.map((el) => {
            const commonProps = {
              ref:      makeNodeRef(el.id),
              onSelect: () => onSelect(el.id),
              onChange: (attrs) => onElementChange(el.id, attrs),
              onUpdate: exportCanvas,
            }
            if (el.type === 'text')  return <KonvaText  key={el.id} el={el} {...commonProps} />
            if (el.type === 'image') return <KonvaImage key={el.id} el={el} {...commonProps} />
            return null
          })}
        </Layer>

        {/* Layer de UI — apenas o Transformer, não entra na textura */}
        <Layer>
          <Transformer
            ref={trRef}
            rotateEnabled
            keepRatio={false}
            anchorSize={10}
            anchorCornerRadius={3}
            anchorStroke="#8B5CF6"
            anchorFill="#1a1040"
            borderStroke="#8B5CF6"
            borderDash={[4, 2]}
            boundBoxFunc={(old, next) =>
              next.width < 10 || next.height < 10 ? old : next
            }
            onTransformEnd={exportCanvas}
          />
        </Layer>
      </Stage>

      {/* Legenda */}
      <p className="text-center text-[9px] text-gray-600 mt-1.5 tracking-widest uppercase">
        Clique para selecionar · Arraste para mover · Alças para redimensionar
      </p>
    </div>
  )
}
