#version 300 es
precision highp float; 

uniform vec3 uColor;

in vec2 vTextureCoord; // recuperation de la coord rasterisee
out vec4 outColor;

void main(void) {
	outColor = vec4(uColor, 1);

	float d = distance(vTextureCoord, vec2(0.5));
	if(d > 0.5){
		discard;
	}
}