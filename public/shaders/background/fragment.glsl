#version 300 es

precision mediump float;

uniform float time;
uniform vec2 resolution;

out vec4 outColor;

#define AA 1	// make this 2 if you are feeling cold...
#define HEIGHT 30.

vec3 _col;

// prim
float sdCylinder( vec3 p, vec2 h )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - h;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}
// min/max polynomial
float smin( float a, float b, float k )
{
	float h = clamp( 0.5 + 0.5*(b-a)/k, 0.0, 1.0 );
	return mix( b, a, h ) - k*h*(1.0-h);
}
float smax(float a, float b, float k)
{
    return smin(a, b, -k);
}
float sminCol( float a, float b, float k, vec3 col1, vec3 col2 )
{
	float h = clamp( 0.5 + 0.5*(b-a)/k, 0.0, 1.0 );
    _col = mix(col1,col2,h);// -  k*h*(1.0-h);
	return mix( b, a, h ) - k*h*(1.0-h);
}

vec3 erot(vec3 p, vec3 ax, float ro)
{
    return mix(dot(p,ax)*ax,p,cos(ro))+sin(ro)*cross(ax,p);
}


    
#define PI 3.14159
#define	TAU 6.28318


vec3 spunk(vec2 uv)
{
    vec3 col = vec3(.55,0.65,1.225);		// Drop Colour
    uv.x = uv.x*15.0;						// H-Count
    float dx = fract(uv.x);
    uv.x = floor(uv.x);
    float t =  time*0.4;
    uv.y *= 0.05;							// stretch
    float s=cos(uv.x*33.1)*.1 +.7;			// speed
    float trail = mix(80.0,20.0,s);			// trail length
    float yv = fract(uv.y + t*s ) * trail;
    yv = 1.0/yv;
    yv = smoothstep(0.0,1.0,yv*yv);
    yv = sin(yv*PI)*(s*7.0);
    float d2 = sin(dx*PI);
    yv *= d2*d2;
    col = col*yv;
	return col;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
     // camera movement	
    float an = sin(time*0.8);
    
    // float dist = 36.0+sin(time)*7.0;
    float dist = 28.0;
    
	vec3 ro = vec3( dist*cos(an), sin(time*0.75)*14.0, dist*sin(an) );
	//vec3 ro = vec3( 16.0*cos(an), 0.0, 16.0*sin(an) );
    vec3 ta = vec3( 0.0, 0.0, 0.0 );
    // camera matrix
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));

    vec3 tot = vec3(0.0);
	    vec2 ppp = (-resolution.xy + 2.*(fragCoord))/resolution.y;

	vec3 bbk = spunk(ppp.xy);
	

    
    #if AA>1
    for( int m=0; m<AA; m++ )
    for( int n=0; n<AA; n++ )
    {
        // pixel coordinates
        vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
        vec2 p = (-resolution.xy + 2.0*(fragCoord+o))/resolution.y;
        #else    
        vec2 p = (-resolution.xy + 2.0*fragCoord)/resolution.y;
        #endif
        float t = 0.0;
        vec3 col = bbk*1.0;
        // gamma        
        col = sqrt( col );
	    tot += col;
	fragColor = vec4( tot, 1.0 );
}

void main(void)
{
    mainImage(outColor, gl_FragCoord.xy);
}