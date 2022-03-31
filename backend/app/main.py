from io import BytesIO
from typing import List
import librosa
import numpy as np
import json

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
#from model import load_model, predict, prepare_audio
from PIL import Image
from pydantic import BaseModel


app = FastAPI()

#model = load_model()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000", #URL Page Web
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the response JSON
class Prediction(BaseModel):
    filename: str
    content_type: str
    predictions: List[dict] = []

@app.get("/nmbFrame")
async def root():
    return {"msg": 119}

@app.get("/newMesh/")
async def newMesh(basis_pond: float = 0.5, jaw_open_pond: float = 0.5, left_eye_closed_pond: float = 0.5, mouth_open_pond: float = 0.5, right_eye_closed_pond: float = 0.5, smile_left_pond: float = 0.5, smile_right_pond: float = 0.5, smile_pond: float = 0.5):

    output = []
    basis = np.loadtxt('../shape_keys_v0/Basis.txt')
    jaw_open = np.loadtxt('../shape_keys_v0/jaw_open.txt')
    left_eye_closed = np.loadtxt('../shape_keys_v0/left_eye_closed.txt')
    mouth_open = np.loadtxt('../shape_keys_v0/mouth_open.txt')
    right_eye_closed = np.loadtxt('../shape_keys_v0/right_eye_closed.txt')
    smile_left = np.loadtxt('../shape_keys_v0/smile_left.txt')
    smile_right = np.loadtxt('../shape_keys_v0/smile_right.txt')
    smile = np.loadtxt('../shape_keys_v0/smile.txt')

    output = basis_pond * basis + jaw_open_pond * jaw_open + left_eye_closed_pond * left_eye_closed + mouth_open_pond * mouth_open + right_eye_closed_pond * right_eye_closed + smile_left_pond * smile_left + smile_right_pond * smile_right + smile_pond * smile 

    lists = output.tolist()
    json_str = json.dumps(lists)

    return {"points": json_str}

if __name__ == "__main__":

    uvicorn.run(app, host="127.0.0.1", port=8080, log_level="info")