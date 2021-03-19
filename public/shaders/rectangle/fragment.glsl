#version 300 es
precision highp float; 

uniform sampler2D uTex;
uniform float uBlink;

in vec2 vTextureCoord; // recuperation de la coord rasterisee
out vec4 outColor;

void main(void) {
	vec4 color = texture(uTex, vTextureCoord);
	if (color.a < 0.2) {
		discard;  
	}

	if(uBlink > 0.0){
		color.r = uBlink;
	}

	
	outColor = color;
}