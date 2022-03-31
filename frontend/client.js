import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader';

var urlAPI = 'http://127.0.0.1:8080/'

// Sizes
const sizes = {
  width: 0.98 * self.innerWidth,
  height: 0.98 * self.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Scene
const scene = new THREE.Scene()

// Lights
const light = new THREE.AmbientLight( 0x404040 );
scene.add(light);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 0.5
camera.position.y = -0.5
scene.add(camera)

// Renderer
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Object Loader
const loader = new OBJLoader();

var _obj;

loader.load( './public/mesh/face_001.obj', function ( obj ) {
  _obj = obj
  _obj.rotation.y += 3.14;
  _obj.rotation.z += 3.14;
  _obj.position.x -= 0.5;
	scene.add( obj );

}, undefined, function ( error ) {

	console.error( error );

} );


// Rendu

async function fetchJSON(url) {
  const response = await fetch(url);
  const jsonFile = await response.json();
  return jsonFile;
}

var btnSK = document.getElementById('btnSK');
var sdBasis = document.getElementById('sdBasis');
var sdJawOpen = document.getElementById('sdJawOpen');
var sdLeftEyeClosed = document.getElementById('sdLeftEyeClosed');
var sdMouthOpen = document.getElementById('sdMouthOpen');
var sdRightEyeClosed = document.getElementById('sdRightEyeClosed');
var sdSmile = document.getElementById('sdSmile');
var sdSmileLeft = document.getElementById('sdSmileLeft');
var sdSmileRight = document.getElementById('sdSmileRight');

btnSK.addEventListener('click', function (ev) {
  var parameters = "?basis_pond=" + (sdBasis.value/100) + "&jaw_open_pond=" + (sdJawOpen.value/100) + "&left_eye_closed_pond=" + (sdLeftEyeClosed.value/100) + "&mouth_open_pond=" + (sdMouthOpen.value/100) + "&right_eye_closed_pond=" + (sdRightEyeClosed.value/100) + "&smile_left_pond=" + (sdSmileLeft.value/100) + "&smile_right_pond=" + (sdSmileRight.value/100) + "&smile_pond=" + (sdSmile.value/100)
  fetchJSON( urlAPI+ 'newMesh/' + parameters).then(jsonFile => {

    var objString = "o newFace \n\n";
    
    var stringPts = jsonFile.points.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '');

    var c_listPts = stringPts.split(',');
    var f_listPts = [];

    c_listPts.forEach(function(elt){
      f_listPts.push(parseFloat(elt));
    });

    for (var i = 0; i < f_listPts.length; i = i+3)
    {
      objString += "v " + f_listPts[i] + " " + f_listPts[i+1] + " " + f_listPts[i+2] + '\n';
    }

    objString += `
f 338 11 152
f 300 339 338
f 334 298 300
f 333 299 285
f 302 285 299
f 369 252 302
f 265 390 369
f 448 357 265
f 367 455 448
f 402 324 367
f 436 362 402
f 368 289 436
f 110 152 11
f 70 110 68
f 105 68 104
f 365 398 368
f 395 366 365
f 396 380 395
f 370 379 396
f 397 401 370
f 153 397 176
f 176 149 153
f 172 177 149
f 150 141 171
f 151 171 170
f 170 137 151
f 136 173 137
f 139 59 173
f 216 133 59
f 178 94 133
f 94 228 235
f 228 128 235
f 163 35 140
f 22 140 72
f 55 72 69
f 104 69 105
f 200 397 429
f 429 370 263
f 396 263 370
f 395 432 396
f 365 431 395
f 368 435 365
f 417 436 434
f 402 434 436
f 377 367 353
f 353 448 346
f 346 265 373
f 373 369 384
f 384 302 301
f 301 299 294
f 294 334 335
f 200 172 176
f 209 141 172
f 171 33 212
f 212 170 171
f 205 211 212
f 211 136 170
f 139 215 193
f 193 216 139
f 178 214 148
f 148 138 178
f 228 124 117
f 35 117 144
f 140 144 157
f 157 72 140
f 69 71 64
f 64 105 69
f 70 106 67
f 109 67 108
f 152 108 10
f 337 152 10
f 297 338 337
f 335 300 297
f 212 195 205
f 33 202 195
f 286 10 9
f 337 296 297
f 297 283 335
f 284 335 283
f 277 294 284
f 354 301 277
f 266 384 354
f 341 373 266
f 347 346 341
f 281 347 348
f 412 353 281
f 433 428 437
f 431 433 423
f 431 425 432
f 419 432 425
f 422 263 419
f 201 429 422
f 201 209 200
f 203 215 211
f 188 214 193
f 188 124 148
f 118 117 124
f 112 144 117
f 36 157 144
f 125 71 157
f 47 64 71
f 53 64 54
f 53 67 106
f 66 108 67
f 56 10 108
f 51 118 124
f 102 119 51
f 101 120 102
f 48 121 101
f 115 122 48
f 129 189 246
f 246 123 194
f 123 169 194
f 169 352 418
f 352 466 418
f 358 413 344
f 351 344 278
f 350 278 330
f 330 349 350
f 331 348 349
f 9 418 286
f 9 194 169
f 418 442 286
f 286 443 296
f 444 296 443
f 445 283 444
f 446 284 445
f 277 343 354
f 354 447 266
f 262 266 447
f 466 414 418
f 453 358 351
f 452 351 350
f 451 350 349
f 450 349 348
f 449 348 347
f 262 347 341
f 465 358 454
f 415 442 414
f 287 443 442
f 258 443 259
f 261 445 260
f 260 444 258
f 468 446 261
f 360 343 468
f 256 447 360
f 449 256 340
f 340 450 449
f 255 451 450
f 254 452 451
f 453 253 257
f 342 453 257
f 464 454 342
f 464 414 465
f 224 66 53
f 223 56 66
f 194 222 190
f 190 246 194
f 234 246 245
f 233 129 234
f 232 122 233
f 231 121 232
f 230 120 231
f 230 118 119
f 229 112 118
f 32 36 112
f 227 125 36
f 114 47 125
f 225 47 226
f 224 54 225
f 28 223 224
f 29 222 223
f 57 190 222
f 244 190 191
f 113 245 244
f 27 234 113
f 23 233 27
f 24 232 23
f 25 231 24
f 111 230 25
f 111 32 229
f 227 26 131
f 131 114 227
f 248 226 114
f 30 226 31
f 28 225 30
f 160 30 161
f 28 159 29
f 159 57 29
f 158 191 57
f 174 244 191
f 31 161 30
f 162 31 248
f 248 34 247
f 34 26 8
f 164 26 111
f 145 111 25
f 146 25 24
f 146 23 154
f 154 27 155
f 155 113 156
f 134 113 244
f 386 287 385
f 387 259 386
f 388 258 387
f 261 388 389
f 468 389 467
f 375 253 254
f 254 374 375
f 255 391 374
f 256 264 250
f 264 360 468
f 264 468 467
f 415 385 287
f 257 381 382
f 382 342 257
f 363 342 383
f 399 464 363
f 37 51 206
f 127 101 143
f 218 48 127
f 175 115 218
f 197 189 175
f 123 198 7
f 420 7 198
f 143 102 37
f 413 420 400
f 344 400 438
f 278 438 356
f 330 356 372
f 331 372 267
f 426 331 267
f 206 188 208
f 208 193 215
f 217 215 213
f 207 208 217
f 204 206 207
f 130 37 204
f 210 143 130
f 199 127 210
f 237 218 199
f 4 175 237
f 196 197 4
f 249 198 196
f 457 420 249
f 438 457 421
f 356 421 430
f 372 430 359
f 267 359 424
f 424 426 267
f 428 427 437
f 407 422 419
f 426 412 281
f 428 417 412
f 434 412 417
f 412 434 377
f 19 422 314
f 202 19 84
f 183 202 84
f 107 195 183
f 44 205 107
f 58 203 44
f 187 213 58
f 93 217 187
f 166 207 93
f 204 166 99
f 336 419 425
f 274 425 423
f 288 423 433
f 410 433 411
f 433 437 411
f 323 437 427
f 427 392 323
f 424 392 427
f 4 6 196
f 282 196 6
f 364 249 282
f 421 364 361
f 430 361 280
f 430 280 359
f 328 424 359
f 359 295 328
f 332 359 280
f 279 332 280
f 279 361 345
f 345 364 441
f 441 282 276
f 276 6 5
f 52 5 6
f 237 52 4
f 199 135 237
f 210 132 199
f 130 50 210
f 135 46 52
f 132 221 135
f 116 50 49
f 103 50 130
f 49 103 65
f 130 65 103
f 204 99 130
f 275 5 2
f 46 2 5
f 458 276 275
f 439 441 458
f 345 440 279
f 440 295 279
f 45 221 238
f 219 221 116
f 220 116 49
f 220 65 236
f 241 65 99
f 2 126 20
f 275 20 355
f 462 275 355
f 459 458 462
f 355 95 371
f 3 371 95
f 95 126 142
f 3 142 98
f 371 462 355
f 463 327 329
f 166 41 40
f 40 168 166
f 165 38 1
f 394 1 268
f 394 270 392
f 392 271 323
f 411 271 410
f 314 406 315
f 406 336 322
f 376 336 274
f 292 274 288
f 292 410 409
f 305 410 271
f 304 271 270
f 303 270 268
f 12 268 1
f 38 12 1
f 73 40 74
f 42 74 75
f 74 41 75
f 74 39 73
f 13 73 39
f 303 13 269
f 272 303 269
f 305 272 273
f 409 273 408
f 307 409 408
f 307 376 292
f 322 308 321
f 406 321 405
f 315 405 316
f 18 314 315
f 84 18 85
f 183 85 182
f 183 92 107
f 44 92 147
f 44 62 58
f 186 58 62
f 41 187 186
f 75 186 185
f 62 185 186
f 77 147 78
f 78 92 91
f 91 182 181
f 181 85 86
f 86 18 17
f 18 316 17
f 14 39 83
f 269 14 313
f 83 42 82
f 272 313 312
f 273 312 311
f 408 311 416
f 99 168 98
f 168 3 98
f 165 327 3
f 394 328 327
f 75 82 42
f 43 75 185
f 82 43 81
f 81 185 184
f 63 184 192
f 192 184 81
f 79 63 192
f 78 63 97
f 97 79 96
f 91 97 90
f 181 90 180
f 86 180 87
f 17 87 16
f 316 16 317
f 404 316 317
f 320 405 404
f 326 321 320
f 293 376 307
f 307 416 293
f 293 416 309
f 326 293 309
f 325 326 309
f 319 326 325
f 319 404 320
f 403 317 404
f 317 15 16
f 16 88 87
f 87 179 180
f 89 180 90
f 97 89 90
f 439 460 310
f 393 439 310
f 440 290 456
f 295 456 461
f 328 295 461
f 461 290 306
f 306 329 461
f 461 327 328
f 329 251 463
f 463 459 462
f 251 460 459
f 310 291 393
f 306 393 291
f 242 45 238
f 243 126 242
f 98 243 100
f 99 98 100
f 241 100 61
f 21 100 243
f 239 243 242
f 240 242 238
f 240 219 80
f 80 220 167
f 167 236 60
f 60 241 76
f 76 241 61
f 76 167 60
f 80 61 21
f 240 21 239
f 338 339 11
f 300 298 339
f 334 333 298
f 333 334 299
f 302 252 285
f 369 390 252
f 265 357 390
f 448 455 357
f 367 324 455
f 402 362 324
f 436 289 362
f 368 398 289
f 110 109 152
f 70 109 110
f 105 70 68
f 365 366 398
f 395 380 366
f 396 379 380
f 370 401 379
f 397 378 401
f 153 378 397
f 176 172 149
f 172 141 177
f 150 177 141
f 151 150 171
f 170 136 137
f 136 139 173
f 139 216 59
f 216 178 133
f 178 138 94
f 94 138 228
f 228 35 128
f 163 128 35
f 22 163 140
f 55 22 72
f 104 55 69
f 200 176 397
f 429 397 370
f 396 432 263
f 395 431 432
f 365 435 431
f 368 417 435
f 417 368 436
f 402 377 434
f 377 402 367
f 353 367 448
f 346 448 265
f 373 265 369
f 384 369 302
f 301 302 299
f 294 299 334
f 200 209 172
f 209 33 141
f 171 141 33
f 212 211 170
f 205 203 211
f 211 215 136
f 139 136 215
f 193 214 216
f 178 216 214
f 148 124 138
f 228 138 124
f 35 228 117
f 140 35 144
f 157 71 72
f 69 72 71
f 64 106 105
f 70 105 106
f 109 70 67
f 152 109 108
f 337 338 152
f 297 300 338
f 335 334 300
f 212 33 195
f 33 209 202
f 286 337 10
f 337 286 296
f 297 296 283
f 284 294 335
f 277 301 294
f 354 384 301
f 266 373 384
f 341 346 373
f 347 353 346
f 281 353 347
f 412 377 353
f 433 435 428
f 431 435 433
f 431 423 425
f 419 263 432
f 422 429 263
f 201 200 429
f 201 202 209
f 203 213 215
f 188 148 214
f 188 51 124
f 118 112 117
f 112 36 144
f 36 125 157
f 125 47 71
f 47 54 64
f 53 106 64
f 53 66 67
f 66 56 108
f 56 9 10
f 51 119 118
f 102 120 119
f 101 121 120
f 48 122 121
f 115 129 122
f 129 115 189
f 246 189 123
f 123 7 169
f 169 7 352
f 352 413 466
f 358 466 413
f 351 358 344
f 350 351 278
f 330 331 349
f 331 281 348
f 9 169 418
f 9 56 194
f 418 414 442
f 286 442 443
f 444 283 296
f 445 284 283
f 446 277 284
f 277 446 343
f 354 343 447
f 262 341 266
f 466 465 414
f 453 454 358
f 452 453 351
f 451 452 350
f 450 451 349
f 449 450 348
f 262 449 347
f 465 466 358
f 415 287 442
f 287 259 443
f 258 444 443
f 261 446 445
f 260 445 444
f 468 343 446
f 360 447 343
f 256 262 447
f 449 262 256
f 340 255 450
f 255 254 451
f 254 253 452
f 453 452 253
f 342 454 453
f 464 465 454
f 464 415 414
f 224 223 66
f 223 222 56
f 194 56 222
f 190 245 246
f 234 129 246
f 233 122 129
f 232 121 122
f 231 120 121
f 230 119 120
f 230 229 118
f 229 32 112
f 32 227 36
f 227 114 125
f 114 226 47
f 225 54 47
f 224 53 54
f 28 29 223
f 29 57 222
f 57 191 190
f 244 245 190
f 113 234 245
f 27 233 234
f 23 232 233
f 24 231 232
f 25 230 231
f 111 229 230
f 111 26 32
f 227 32 26
f 131 248 114
f 248 31 226
f 30 225 226
f 28 224 225
f 160 28 30
f 28 160 159
f 159 158 57
f 158 174 191
f 174 134 244
f 162 161 31
f 247 162 248
f 248 131 34
f 34 131 26
f 164 8 26
f 145 164 111
f 146 145 25
f 146 24 23
f 154 23 27
f 155 27 113
f 134 156 113
f 386 259 287
f 387 258 259
f 388 260 258
f 261 260 388
f 468 261 389
f 375 381 253
f 254 255 374
f 255 340 391
f 250 391 340
f 340 256 250
f 264 256 360
f 415 399 385
f 257 253 381
f 382 383 342
f 363 464 342
f 399 415 464
f 37 102 51
f 127 48 101
f 218 115 48
f 175 189 115
f 197 123 189
f 123 197 198
f 420 352 7
f 143 101 102
f 413 352 420
f 344 413 400
f 278 344 438
f 330 278 356
f 331 330 372
f 426 281 331
f 206 51 188
f 208 188 193
f 217 208 215
f 207 206 208
f 204 37 206
f 130 143 37
f 210 127 143
f 199 218 127
f 237 175 218
f 4 197 175
f 196 198 197
f 249 420 198
f 457 400 420
f 438 400 457
f 356 438 421
f 372 356 430
f 267 372 359
f 424 427 426
f 428 426 427
f 407 314 422
f 426 428 412
f 428 435 417
f 19 201 422
f 202 201 19
f 183 195 202
f 107 205 195
f 44 203 205
f 58 213 203
f 187 217 213
f 93 207 217
f 204 207 166
f 336 407 419
f 274 336 425
f 288 274 423
f 410 288 433
f 323 411 437
f 424 328 392
f 4 52 6
f 282 249 196
f 364 457 249
f 421 457 364
f 430 421 361
f 359 332 295
f 279 295 332
f 279 280 361
f 345 361 364
f 441 364 282
f 276 282 6
f 52 46 5
f 237 135 52
f 199 132 135
f 210 50 132
f 135 221 46
f 132 116 221
f 116 132 50
f 49 50 103
f 130 99 65
f 275 276 5
f 46 45 2
f 458 441 276
f 439 345 441
f 345 439 440
f 440 456 295
f 45 46 221
f 219 238 221
f 220 219 116
f 220 49 65
f 241 236 65
f 2 45 126
f 275 2 20
f 462 458 275
f 459 460 458
f 355 20 95
f 3 327 371
f 95 20 126
f 3 95 142
f 371 463 462
f 463 371 327
f 166 93 41
f 40 38 168
f 165 168 38
f 394 165 1
f 394 268 270
f 392 270 271
f 411 323 271
f 314 407 406
f 406 407 336
f 376 322 336
f 292 376 274
f 292 288 410
f 305 409 410
f 304 305 271
f 303 304 270
f 12 303 268
f 38 73 12
f 73 38 40
f 74 40 41
f 74 42 39
f 13 12 73
f 303 12 13
f 272 304 303
f 305 304 272
f 409 305 273
f 307 292 409
f 322 376 308
f 406 322 321
f 315 406 405
f 18 19 314
f 84 19 18
f 183 84 85
f 183 182 92
f 44 107 92
f 44 147 62
f 186 187 58
f 41 93 187
f 75 41 186
f 62 77 185
f 77 62 147
f 78 147 92
f 91 92 182
f 181 182 85
f 86 85 18
f 18 315 316
f 14 13 39
f 269 13 14
f 83 39 42
f 272 269 313
f 273 272 312
f 408 273 311
f 99 166 168
f 168 165 3
f 165 394 327
f 394 392 328
f 75 43 82
f 81 43 185
f 63 77 184
f 185 77 184
f 78 77 63
f 97 63 79
f 91 78 97
f 181 91 90
f 86 181 180
f 17 86 87
f 316 17 16
f 404 405 316
f 320 321 405
f 326 308 321
f 293 308 376
f 307 408 416
f 326 308 293
f 319 320 326
f 319 403 404
f 403 318 317
f 317 318 15
f 16 15 88
f 87 88 179
f 89 179 180
f 97 96 89
f 439 458 460
f 393 440 439
f 440 393 290
f 461 456 290
f 306 291 329
f 461 329 327
f 329 291 251
f 463 251 459
f 251 310 460
f 310 251 291
f 306 290 393
f 242 126 45
f 243 142 126
f 98 142 243
f 241 99 100
f 21 61 100
f 239 21 243
f 240 239 242
f 240 238 219
f 80 219 220
f 167 220 236
f 60 236 241
f 76 61 167
f 80 167 61
f 240 80 21
    `

    var obj = loader.parse(objString)
    scene.remove( _obj );
    _obj = obj
    var factor = 1/((parseFloat(sdBasis.value) + parseFloat(sdJawOpen.value) + parseFloat(sdLeftEyeClosed.value) + parseFloat(sdMouthOpen.value) + parseFloat(sdRightEyeClosed.value) + parseFloat(sdSmile.value) + parseFloat(sdSmileLeft.value) + parseFloat(sdSmileRight.value))/8) * 50
    _obj.scale.set(factor,factor,factor);
    _obj.position.z -= 10
    obj.rotation.x -= 1.70;
    scene.add( obj );

  });
})

var time = 0, nmbFrame = -1, idx = -1
const clock = new THREE.Clock();

let start = document.getElementById('btnStartAnimation');


start.addEventListener('click', function (ev) {
  idx = 2
  if(nmbFrame == -1)
  {
    fetchJSON(urlAPI + "nmbFrame/").then(jsonFile => {
      nmbFrame = jsonFile.msg;
    });
  }
})

function render()
{
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

function faceAnimation()
{
  var idxstring = idx.toString().padStart(3, '0')

  var string = './public/mesh/face_' + idxstring + '.obj'

  loader.load( string, function ( obj ) {
    scene.remove( _obj );
    _obj = obj
    _obj.rotation.y += 3.14;
    _obj.rotation.z += 3.14;
    _obj.position.x -= 0.5;
    scene.add( obj );
  
  }, undefined, function ( error ) {
  
    console.error( error );
  
  } );

  idx += 1
}

function calculateTime()
{
  time += clock.getDelta()
  if(time > 1/45)
  {
    if(idx < nmbFrame)
      window.requestAnimationFrame(faceAnimation)
    time = 0
  }
  window.requestAnimationFrame(calculateTime)
}

render()
calculateTime()