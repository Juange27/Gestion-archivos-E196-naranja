import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, FileX } from 'lucide-react';
import { mockFiles, formatFileSize, formatDate } from '../data/mockData';
import { toast } from 'sonner';

export function FilePreview() {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const file = mockFiles.find(f => f.id === fileId);

  if (!file) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <FileX className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Archivo no encontrado</h2>
          <button
            onClick={() => navigate('/files')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Volver al explorador
          </button>
        </div>
      </div>
    );
  }

  const canPreview = ['pdf', 'docx', 'image', 'txt'].includes(file.type);

  const handleDownload = () => {
    toast.success(`Descargando ${file.name}...`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/files')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="dark:text-gray-300" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{file.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {file.type.toUpperCase()} • {formatFileSize(file.size)} • Subido {formatDate(file.uploadDate)}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            Descargar
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-8 overflow-auto bg-gray-50 dark:bg-gray-900">
        {canPreview ? (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              {file.type === 'pdf' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Vista previa del documento PDF</p>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-8 max-w-2xl mx-auto text-left border dark:border-gray-700">
                      <h3 className="text-xl font-bold mb-4 dark:text-white">Documento de ejemplo</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Este es un visor de documentos PDF integrado. Aquí se mostraría el contenido
                        completo del archivo PDF con capacidad de desplazamiento y zoom.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Los usuarios pueden navegar por todas las páginas del documento, realizar
                        búsquedas de texto y ajustar el nivel de zoom según sus preferencias.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded">
                        <p className="text-blue-900 dark:text-blue-300 text-sm">
                          <strong>Nota:</strong> Esta es una representación visual del visor PDF.
                          En producción, se integraría una librería como PDF.js.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {file.type === 'docx' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Vista previa del documento Word</p>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-8 max-w-2xl mx-auto text-left border dark:border-gray-700">
                      <h3 className="text-2xl font-bold mb-4 dark:text-white">Título del Documento</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        Este es un visor de documentos de Microsoft Word. El contenido se renderiza
                        manteniendo el formato original del documento, incluyendo estilos de texto,
                        tablas, imágenes y otros elementos.
                      </p>
                      <h4 className="text-lg font-semibold mb-2 dark:text-white">Sección 1</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                        <li>Primer punto importante</li>
                        <li>Segundo punto importante</li>
                        <li>Tercer punto importante</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {file.type === 'image' && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-12 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 max-w-3xl border dark:border-gray-700">
                    <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-blue-500 rounded flex items-center justify-center">
                      <p className="text-white text-lg font-medium">Vista previa de imagen</p>
                    </div>
                  </div>
                </div>
              )}

              {file.type === 'txt' && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
                  <div className="bg-gray-900 dark:bg-black text-green-400 rounded p-6 font-mono text-sm border dark:border-gray-700">
                    <p># Archivo de texto de ejemplo</p>
                    <p className="mt-2">Este es el contenido del archivo de texto.</p>
                    <p className="mt-2">Línea 1: Información importante</p>
                    <p>Línea 2: Más datos aquí</p>
                    <p>Línea 3: Contenido adicional</p>
                    <p className="mt-4">// Fin del archivo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <FileX className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Previsualización no disponible
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Este tipo de archivo ({file.type.toUpperCase()}) no puede ser previsualizado en el navegador.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Información del archivo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{file.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{file.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tamaño:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatFileSize(file.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fecha de subida:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDate(file.uploadDate)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
              >
                <Download size={18} />
                Descargar archivo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
