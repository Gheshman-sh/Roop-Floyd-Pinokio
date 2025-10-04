module.exports = {
  run: [
    // 1️⃣ Clone the repo
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://codeberg.org/Cognibuild/ROOP-FLOYD app"
        ]
      }
    },

    // 2️⃣ Initialize venv through torch.js
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },

    // 3️⃣ Install PyTorch
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118"
        ]
      }
    },

    // 4️⃣ Install OpenCV + NumPy (compatibility fixed)
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          'pip install "numpy<2.0" opencv-python-headless==4.9.0.80'
        ]
      }
    },

    // 5️⃣ Install InsightFace + ONNX stack
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install insightface onnx onnxruntime onnxruntime-gpu"
        ]
      }
    },

    // 6️⃣ Install utility libraries (performance + UI)
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install albucore psutil tqdm ftfy regex pyvirtualcam"
        ]
      }
    },

    // 7️⃣ Install FastAPI + Gradio + backend stack
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install fastapi==0.115.2 gradio==5.13.0 pydantic==2.10.6 uvicorn==0.30.3"
        ]
      }
    },

    // 8️⃣ Install SciPy + Pillow + GUI extras
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install scipy==1.11.4 Pillow requests imageio PyQt5 PySide6"
        ]
      }
    }
  ]
};
