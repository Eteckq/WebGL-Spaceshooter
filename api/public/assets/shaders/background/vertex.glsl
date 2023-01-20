#version 300 es
// *** le vertex shader *** 
layout(location=0) in vec3 aVertexPosition; // la position du sommet 
layout(location=1) in vec2 aVertexCoord; // sa coordonnee de texture 

out vec2 fragCoord; // on souhaite rasteriser la coordonnee

void main(void) {
    // projection de la position
    gl_Position = vec4(aVertexPosition, 1.0);

    // stockage de la coordonnee de texture
    fragCoord = aVertexCoord;
}