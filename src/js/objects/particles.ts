import Object from "./abstract/object";

export default class Particles extends Object {
  constructor() {
    super()
  }
  sendUniformVariables() {
    throw new Error('Method not implemented.')
  }
  tick(elapsed: number) {
    throw new Error('Method not implemented.')
  }
  draw() {
    throw new Error('Method not implemented.')
  }
  clear() {
    throw new Error('Method not implemented.')
  }

  public init(
    gl: { VERTEX_SHADER: any; FRAGMENT_SHADER: any; getAttribLocation: (arg0: any, arg1: string) => any; FLOAT: any; createBuffer: () => any; createVertexArray: () => any; bindBuffer: (arg0: any, arg1: any) => void; ARRAY_BUFFER: any; bufferData: (arg0: any, arg1: Float32Array, arg2: any) => void; STREAM_DRAW: any; clearColor: (arg0: number, arg1: number, arg2: number, arg3: number) => void; createTexture: () => any; bindTexture: (arg0: any, arg1: any) => void; TEXTURE_2D: any; texImage2D: (arg0: any, arg1: number, arg2: any, arg3: number, arg4: number, arg5: number, arg6: any, arg7: any, arg8: any) => void; RG8: any; RG: any; UNSIGNED_BYTE: any; texParameteri: (arg0: any, arg1: any, arg2: any) => void; TEXTURE_WRAP_S: any; MIRRORED_REPEAT: any; TEXTURE_WRAP_T: any; TEXTURE_MIN_FILTER: any; NEAREST: any; TEXTURE_MAG_FILTER: any; enable: (arg0: any) => void; BLEND: any; blendFunc: (arg0: any, arg1: any) => void; SRC_ALPHA: any; ONE_MINUS_SRC_ALPHA: any; },
    num_particles: any,
    particle_birth_rate: any,
    min_age: number,
    max_age: number, 
    min_theta: number,
    max_theta: number,
    min_speed: number,
    max_speed: number,
    gravity: any) {
  /* Do some parameter validation */
  if (max_age < min_age) {
    throw "Invalid min-max age range.";
  }
  if (max_theta < min_theta ||
      min_theta < -Math.PI ||
      max_theta > Math.PI) {
    throw "Invalid theta range.";
  }
  if (min_speed > max_speed) {
    throw "Invalid min-max speed range.";
  }

  /* Create programs for updating and rendering the particle system. */
  var update_program = createGLProgram(
    gl,
    [
      {name: "particle-update-vert", type: gl.VERTEX_SHADER},
      {name: "passthru-frag-shader", type: gl.FRAGMENT_SHADER},
    ],
    [
      "v_Position",
      "v_Age",
      "v_Life",
      "v_Velocity",
    ]);
  var render_program = createGLProgram(
    gl,
    [
      {name: "particle-render-vert", type: gl.VERTEX_SHADER},
      {name: "particle-render-frag", type: gl.FRAGMENT_SHADER},
    ],
    null);

  /* Capture attribute locations from program objects. */
  var update_attrib_locations = {
    i_Position: {
      location: gl.getAttribLocation(update_program, "i_Position"),
      num_components: 2,
      type: gl.FLOAT
    },
    i_Age: {
      location: gl.getAttribLocation(update_program, "i_Age"),
      num_components: 1,
      type: gl.FLOAT
    },
    i_Life: {
      location: gl.getAttribLocation(update_program, "i_Life"),
      num_components: 1,
      type: gl.FLOAT
    },
    i_Velocity: {
      location: gl.getAttribLocation(update_program, "i_Velocity"),
      num_components: 2,
      type: gl.FLOAT
    }
  };
  var render_attrib_locations = {
    i_Position: {
      location: gl.getAttribLocation(render_program, "i_Position"),
      num_components: 2,
      type: gl.FLOAT
    }
  };

  /* These buffers shall contain data about particles. */
  var buffers = [
    gl.createBuffer(),
    gl.createBuffer(),
  ];
  /* We'll have 4 VAOs... */
  var vaos = [
    gl.createVertexArray(), /* for updating buffer 1 */
    gl.createVertexArray(), /* for updating buffer 2 */
    gl.createVertexArray(), /* for rendering buffer 1 */
    gl.createVertexArray() /* for rendering buffer 2 */
  ];

  /* this has information about buffers and bindings for each VAO. */
  var vao_desc = [
    {
      vao: vaos[0],
      buffers: [{
        buffer_object: buffers[0],
        stride: 4 * 6,
        attribs: update_attrib_locations
      }]
    },
    {
      vao: vaos[1],
      buffers: [{
        buffer_object: buffers[1],
        stride: 4 * 6,
        attribs: update_attrib_locations
      }]
    },
    {
      vao: vaos[2],
      buffers: [{
        buffer_object: buffers[0],
        stride: 4 * 6,
        attribs: render_attrib_locations
      }],
    },
    {
      vao: vaos[3],
      buffers: [{
        buffer_object: buffers[1],
        stride: 4 * 6,
        attribs: render_attrib_locations
      }],
    },
  ];

  /* Populate buffers with some initial data. */
  var initial_data =
    new Float32Array(initialParticleData(num_particles, min_age, max_age));
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
  gl.bufferData(gl.ARRAY_BUFFER, initial_data, gl.STREAM_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
  gl.bufferData(gl.ARRAY_BUFFER, initial_data, gl.STREAM_DRAW);

  /* Set up VAOs */
  for (var i = 0; i < vao_desc.length; i++) {
    setupParticleBufferVAO(gl, vao_desc[i].buffers, vao_desc[i].vao);
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  /* Create a texture for random values. */
  var rg_noise_texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, rg_noise_texture);
  gl.texImage2D(gl.TEXTURE_2D,
                0, 
                gl.RG8,
                512, 512,
                0,
                gl.RG,
                gl.UNSIGNED_BYTE,
                randomRGData(512, 512));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  /* Set up blending */
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  return {
    particle_sys_buffers: buffers,
    particle_sys_vaos: vaos,
    read: 0,
    write: 1,
    particle_update_program: update_program,
    particle_render_program: render_program,
    num_particles: initial_data.length / 6,
    old_timestamp: 0.0,
    rg_noise: rg_noise_texture,
    total_time: 0.0,
    born_particles: 0,
    birth_rate: particle_birth_rate,
    gravity: gravity,
    origin: [0.0, 0.0],
    min_theta: min_theta,
    max_theta: max_theta,
    min_speed: min_speed,
    max_speed: max_speed
  };
}

  public setupParticleBufferVAO(gl: { bindVertexArray: (arg0: any) => void; bindBuffer: (arg0: any, arg1: any) => void; ARRAY_BUFFER: any; enableVertexAttribArray: (arg0: any) => void; vertexAttribPointer: (arg0: any, arg1: any, arg2: any, arg3: boolean, arg4: any, arg5: number) => void; vertexAttribDivisor: (arg0: any, arg1: any) => void; }, buffers: string | any[], vao: any) {
  gl.bindVertexArray(vao);
  for (var i = 0; i < buffers.length; i++) {
    var buffer = buffers[i];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer_object);
    var offset = 0;
    for (var attrib_name in buffer.attribs) {
      if (buffer.attribs.hasOwnProperty(attrib_name)) {
        /* Set up vertex attribute pointers for attributes that are stored in this buffer. */
        var attrib_desc = buffer.attribs[attrib_name];
        gl.enableVertexAttribArray(attrib_desc.location);
        gl.vertexAttribPointer(
          attrib_desc.location,
          attrib_desc.num_components,
          attrib_desc.type,
          false, 
          buffer.stride,
          offset);
        /* we're only dealing with types of 4 byte size in this demo, unhardcode if necessary */
        var type_size = 4;

        /* Note that we're cheating a little bit here: if the buffer has some irrelevant data
           between the attributes that we're interested in, calculating the offset this way
           would not work. However, in this demo, buffers are laid out in such a way that this code works :) */
        offset += attrib_desc.num_components * type_size;

        if (attrib_desc.hasOwnProperty("divisor")) { /* we'll need this later */
          gl.vertexAttribDivisor(attrib_desc.location, attrib_desc.divisor);
        }
      }
    }
  }
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}


  public randomRGData(size_x: number, size_y: number) {
    var d = []
    for (var i = 0; i < size_x * size_y; ++i) {
      d.push(Math.random() * 255.0)
      d.push(Math.random() * 255.0)
    }
    return new Uint8Array(d)
  }

  public initialParticleData(num_parts: number, min_age: number, max_age: number) {
    var data = []
    for (var i = 0; i < num_parts; ++i) {
      // position
      data.push(0.0)
      data.push(0.0)

      var life = min_age + Math.random() * (max_age - min_age)
      // set age to max. life + 1 to ensure the particle gets initialized
      // on first invocation of particle update shader
      data.push(life + 1)
      data.push(life)

      // velocity
      data.push(0.0)
      data.push(0.0)
    }
    return data
  }
}