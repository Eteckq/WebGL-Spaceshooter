#version 300 es
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