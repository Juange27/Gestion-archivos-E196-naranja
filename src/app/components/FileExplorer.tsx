import { useState } from 'react';
import {
  Eye,
  Download,
  Trash2,
  FileText,
  File,
  FolderArchive,
  Image as ImageIcon,
  Folder,
  ChevronRight,
  Grid3x3,
  List,
  X
} from 'lucide-react';
import { Link } from 'react-router';
import { mockFiles, formatFileSize, formatDate } from '../data/mockData';
import { toast } from 'sonner';

export function FileExplorer() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const files = mockFiles.filter(f => {
    const matchesDeleted = !f.isDeleted;
    const matchesFilter = filterType === 'all' || f.type === filterType;
    const matchesSearch = searchQuery === '' || f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDeleted && matchesFilter && matchesSearch;
  });

  const getFileIcon = (type: string, size = 20) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={size} />;
      case 'docx': return <FileText className="text-blue-500" size={size} />;
      case 'zip': return <FolderArchive className="text-yellow-500" size={size} />;
      case 'exe': return <File className="text-gray-700" size={size} />;
      case 'folder': return <Folder className="text-blue-400" size={size} />;
      case 'image': return <ImageIcon className="text-purple-500" size={size} />;
      case 'txt': return <FileText className="text-gray-500" size={size} />;
      default: return <File className="text-gray-500" size={size} />;
    }
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Descargando ${fileName}...`);
  };

  const handleDelete = (fileName: string) => {
    toast.success(`${fileName} movido a la papelera`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>Inicio</span>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-white font-medium">Todos los archivos</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explorador de Archivos</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Grid3x3 size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar archivos por nombre..."
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'pdf', 'docx', 'zip', 'image', 'folder'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === type
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {type === 'all' ? 'Todos' : type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* File List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Tamaño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span className="font-medium text-gray-900 dark:text-white">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                        {file.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {file.type === 'folder' ? '—' : formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {formatDate(file.uploadDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/files/${file.id}`}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                          title="Previsualizar"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDownload(file.name)}
                          className="p-2 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-colors"
                          title="Descargar"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(file.name)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="mb-3">
                  {getFileIcon(file.type, 48)}
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate w-full" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {file.type === 'folder' ? 'Carpeta' : formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1 pt-3 border-t border-gray-100 dark:border-gray-700">
                <Link
                  to={`/files/${file.id}`}
                  className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
                  title="Previsualizar"
                >
                  <Eye size={16} />
                </Link>
                <button
                  onClick={() => handleDownload(file.name)}
                  className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded transition-colors"
                  title="Descargar"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => handleDelete(file.name)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
