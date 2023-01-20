#version 300 es
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