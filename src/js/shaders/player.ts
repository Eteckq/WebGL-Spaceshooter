const vertex = `#version 300 es
      // *** le vertex shader *** 
      layout(location=0) in vec3 aVertexPosition;
      layout(location=1) in vec3 aVertexNormal;
      
      uniform mat4 uModelMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uProjMatrix;
      uniform float timer;
      
      out vec3 vNormal;
      
      void main(void) {
          // projection de la position
	  vec3 p = aVertexPosition;

	  // exemple de modification de la hauteur du mod�le avec un simple timer
	  // bien pour les petits effets, mais si possible modifier directement la
	  // matrice model en amont (dans setParameters du fichier plane)
	  //p.z += 3.0*sin(timer*10.0);
	  
          gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(p, 1.0);
          vNormal = mat3(inverse(transpose(uViewMatrix * uModelMatrix)))*normalize(aVertexNormal);
      }
`

const fragment = `#version 300 es
      // *** le fragment shader ***
      precision mediump float; // precision des nombres flottant
      
    in vec3 vNormal;
      out vec4 outColor;
      
      void main(void) {
          // la normale (en tout point)
	  vec3 n = normalize(vNormal);

	  // une direction de lumi�re quelconque
	  vec3 l = normalize(vec3(-1.0,0.0,1.0));

	  // une couleur (ex. rouge)
	  vec3 Kd = vec3(1.0,0.0,0.0);

	  // un �clairage simple
	  vec3 diff = Kd*max(dot(n,l),0.0);

	  // que l'on affiche en sortie
          outColor = vec4(diff,1.0);
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
