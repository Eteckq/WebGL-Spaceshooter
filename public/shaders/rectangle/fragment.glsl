#version 300 es
precision highp float; 

uniform sampler2D uTex;

in vec2 vTextureCoord; // recuperation de la coord rasterisee
out vec4 outColor;

void main(void) {
	vec2 coord = vTextureCoord;
	vec4 color = texture(uTex, vTextureCoord);
	if (color.a < 0.2) {
		discard;  
	}
	outColor = color;
}