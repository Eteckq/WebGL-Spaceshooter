#version 300 es
precision highp float; 

uniform vec3 uColor;

in vec2 vTextureCoord; // recuperation de la coord rasterisee
out vec4 outColor;

void main(void) {
	// vec3 n = normalize(vec3(vTextureCoord, 1.0));
	// vec3 l = normalize(vec3(-1.0,0.0,1.0));
	// vec3 diff = uColor*max(dot(n,l),0.0);

	// que l'on affiche en sortie
	outColor = vec4(uColor,1.0);

	float d = distance(vTextureCoord, vec2(0.5));
	if(d > 0.5){
		discard;
	}
}