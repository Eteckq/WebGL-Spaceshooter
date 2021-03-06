#version 300 es
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