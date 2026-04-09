import { Trash2, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';

export function Trash() {
  const handleRestore = (fileName: string) => {
    toast.success(`${fileName} restaurado correctamente`);
  };

  const handleDelete = (fileName: string) => {
    toast.success(`${fileName} eliminado permanentemente`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trash2 className="text-red-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">Papelera</h2>
        </div>
        <p className="text-gray-600">Archivos eliminados recientemente (se borran automáticamente después de 30 días)</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Trash2 className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">La papelera está vacía</h3>
          <p className="text-gray-600">
            No hay archivos en la papelera. Los archivos eliminados aparecerán aquí.
          </p>
        </div>
      </div>

      {/* Example of what deleted files would look like */}
      <div className="mt-8 opacity-50 pointer-events-none">
        <p className="text-sm text-gray-500 mb-4">Vista previa de archivos eliminados:</p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {['Archivo_Eliminado_1.pdf', 'Proyecto_Viejo.zip', 'Backup_Antiguo.docx'].map((name, index) => (
            <div key={index} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500 mt-1">Eliminado hace 5 días</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestore(name)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Restaurar
                  </button>
                  <button
                    onClick={() => handleDelete(name)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
