import { useState } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, Loader } from 'lucide-react';
import { formatFileSize } from '../data/mockData';
import { toast } from 'sonner';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

export function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });

    toast.success(`${files.length} archivo(s) en cola de subida`);
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
          )
        );
        toast.success('Archivo subido exitosamente');
      } else {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
          )
        );
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Subir Archivos</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-colors
          ${isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
          }
        `}
      >
        <div className="flex flex-col items-center">
          <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <UploadIcon className={isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'} size={48} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDragging ? 'Suelta los archivos aquí' : 'Arrastra y suelta tus archivos'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Soporta PDF, DOCX, ZIP, EXE, imágenes y más
          </p>
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
            <UploadIcon size={18} />
            Seleccionar archivos
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Archivos en progreso ({uploadedFiles.length})
          </h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'uploading' && (
                      <Loader className="text-blue-600 dark:text-blue-400 animate-spin" size={20} />
                    )}
                    {file.status === 'completed' && (
                      <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <X className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        file.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {file.status === 'uploading' && `${Math.round(file.progress)}%`}
                    {file.status === 'completed' && 'Completado'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Consejos para subir archivos</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span>Puedes subir múltiples archivos a la vez</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span>Tamaño máximo por archivo: 100 MB</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span>Los archivos se almacenan de forma segura y cifrada</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
