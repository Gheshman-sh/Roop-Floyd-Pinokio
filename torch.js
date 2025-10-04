module.exports = {
  run: [
    // 1️⃣ Install PyTorch with CUDA 12.1 (stable for RTX 30/40)
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : 'env'}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121"
        ]
      }
    },

    // 2️⃣ Install ONNX Runtime GPU (CUDA ExecutionProvider)
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : 'env'}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "pip install onnxruntime-gpu==1.17.1"
        ]
      }
    },

    // 3️⃣ Verify CUDA provider available
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : 'env'}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -c \"import torch, onnxruntime; print('CUDA Available:', torch.cuda.is_available()); print('ONNX Providers:', onnxruntime.get_available_providers())\""
        ]
      }
    },

    // 4️⃣ Optional: install xformers (accelerates attention ops)
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : 'env'}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "pip install xformers==0.0.27"
        ]
      }
    }
  ]
};
