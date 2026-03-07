COMO USAR O MODELO 3D DA CAMISA
================================

1. Coloque aqui o arquivo: shirt.obj
   Caminho: /public/models/shirt.obj

2. O site vai carregar automaticamente.

3. Formatos suportados: OBJ (Wavefront)
   - Certifique-se que o arquivo .obj tem UV mapping configurado
     para que as texturas apareçam corretamente.
   - Se o arquivo MTL existir, renomeie para shirt.mtl na mesma pasta.

4. Sem o arquivo, o site usa um modelo 3D gerado proceduralmente
   como fallback — o editor continua funcionando normalmente.

DICAS:
- Tamanho recomendado do modelo: normalizado para ~1 unidade
- Escala: se o modelo aparecer muito grande ou pequeno,
  ajuste o prop `scale` em ShirtViewer.jsx e ShirtConfigurator.jsx
