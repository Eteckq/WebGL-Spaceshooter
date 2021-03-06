const vertex = `#version 300 es
      // *** le vertex shader *** 
      layout(location=0) in vec3 aVertexPosition; // la position du sommet 
      layout(location=1) in vec2 aVertexCoord; // sa coordonnee de texture 
      
      uniform vec3 uPosition; // position du vaisseau
      out vec2 vTextureCoord; // on souhaite rasteriser la coordonnee
      
      void main(void) {
	  // projection de la position
	  gl_Position = vec4(aVertexPosition.xy+uPosition.xy,uPosition.z, 1.0);
	  
	  // stockage de la coordonnee de texture
	  vTextureCoord = aVertexCoord;
      }
`

const fragment = `#version 300 es
      precision highp float; // precision des nombres flottant

      uniform vec3 maCouleur;
      uniform sampler2D uTex;
      
    in vec2 vTextureCoord; // recuperation de la coord rasterisee
      out vec4 outColor;
      
      void main(void) {
	  // affichage d'une texture
	  vec2 coord = vTextureCoord;
	  outColor = texture(uTex,coord);

	  // affichage d'un rond bleu
	  // float test = distance(vec2(.5),vTextureCoord);
	  // if(test<0.1) {
	  //     outColor = vec4(0.,0.,1.,1.);
	  // } else {
	  //     outColor = vec4(0.);
	  // }
	  
	  // affichage d'un rond avec couleur param�tr�e et bords lisses 
	  // float alpha = 1.-smoothstep(0.2,0.25,distance(vec2(.5),vTextureCoord));
	  // outColor = vec4(alpha*maCouleur,alpha);
      }
`

export default {
  vs: {
    type: 'vertex',
    str: vertex,
  },
  fs: {
    type: 'fragment',
    str: fragment,
  },
}
