#version 300 es
      // *** le fragment shader ***
      precision highp float; // precision des nombres flottant
      
      uniform vec2 uOffset;
      uniform float uAmplitude; // amplitude du bruit
      uniform float uFrequency; // frequence du bruit
      uniform float uPersistence; // persistence du bruit
      
    in vec2 vTextureCoord; // recuperation de la coord rasterisee
      out vec4 outColor;
      
      vec2 hash22(vec2 p) {
	  vec2 q = vec2(dot(p,vec2(127.1,311.7)), 
			dot(p,vec2(269.5,183.3)));
	  return fract(sin(q)*43758.5453123)*2.-1.;
      }
      
      float gnoise(in vec2 x) {
	  // cette fonction calcule un gradient noise
	  // un bruit al�atoire, lisse qui peut etre cacul�
	  // a la vol� avec une petite proc�dure. 
	  vec2 p = floor(x);
	  vec2 f = fract(x);
	  vec2 m = f*f*(3.-2.*f);
	  
	  return mix(
	      mix(dot(hash22(p+vec2(0.,0.)),f-vec2(0.,0.)),
		  dot(hash22(p+vec2(1.,0.)),f-vec2(1.,0.)),m.x),
	      mix(dot(hash22(p+vec2(0.,1.)),f-vec2(0.,1.)),
		  dot(hash22(p+vec2(1.,1.)),f-vec2(1.,1.)),m.x),m.y);
      }
      
      float fractalNoise(in vec2 p) {
	  // cette fonction utilise le gradient noise
	  // pour cr�er un bruit fractal (qui se ressemble
	  // � des echelles multiples)
       	  const int nb = 5; // nb octave
       	  float f = uFrequency; // frequency
       	  float a = uAmplitude; // amplitude
       	  float e = uPersistence; // persistence

       	  float n = 0.0;
       	  for(int i=0;i<nb;++i) {
              n = n + a*gnoise(p*f);
              f = 2.0*f;
              a = a*e;
       	  }
       	  return n;
      }

      float computeHeight(in vec2 p) {
	  // vous pouvez modifier cette fonction comme vous
	  // le souhaitez pour fabriquer votre propre background

	  // exemple avec une sinusoide
	  float test = 100.0*sin(p.x*5.0)*sin(p.y*5.0);

	  // exemple avec un bruit de perlin 
	  //float test = fractalNoise(p)*0.5+0.5;

	  // et on peut combiner tout ce que l'on veut... 
	  
	  return test;
      }

      vec3 computeNormal(in vec2 p) {
	  // cette fonction permet de calculer le vecteur normal
	  // (l'orientation de la surface en tout point)
	  float scale = 70.0;
	  float xp = computeHeight(p+vec2( 0.001,0.0));
	  float xm = computeHeight(p+vec2(-0.001,0.0));
	  float yp = computeHeight(p+vec2(0.0, 0.001));
	  float ym = computeHeight(p+vec2(0.0,-0.001));
	  
	  float gx = 0.5*(xp-xm)*scale;
	  float gy = 0.5*(yp-ym)*scale;

	  vec3 v1 = normalize(vec3(1.0,0.0,gx));
	  vec3 v2 = normalize(vec3(0.0,1.0,gy));

	  return cross(v1,v2);
      }
      
      void main(void) {
	  // d�calage avec la variable uOffset
	  vec2 tmp = vTextureCoord*2.0-vec2(1.0);

	  // offset permets de faire bouger le backgroud vers le haut dans cet exemple
	  vec2 p = tmp+uOffset;
	  
	  float d = computeHeight(p); // profondeur au point p
	  vec3 n = computeNormal(p); // normale au point p
	  	  
	  // affichage de la profondeur
	  outColor = vec4(d,d,d,1.0);

	  // affichage des normales
	  outColor = vec4(n,1.0);
	  
	  // affichage d'une couleur en fonction de la hauteur
	  vec4 c1 = vec4(1,1,1,1); // vert
	  vec4 c2 = vec4(0,0,0,1); // blanc
	  outColor = mix(mix(c2,c1,d),c2,d); // interpolation entre c1 et c2 en fonction de la profondeur
	  
      }