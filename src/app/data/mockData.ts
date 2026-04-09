export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'zip' | 'exe' | 'folder' | 'image' | 'txt';
  size: number;
  uploadDate: string;
  isDeleted?: boolean;
}

export const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Informe_Anual_2025.pdf',
    type: 'pdf',
    size: 2548000,
    uploadDate: '2026-04-05T10:30:00',
  },
  {
    id: '2',
    name: 'Presentación_Proyecto.docx',
    type: 'docx',
    size: 1024000,
    uploadDate: '2026-04-06T14:20:00',
  },
  {
    id: '3',
    name: 'Backup_Sistema.zip',
    type: 'zip',
    size: 15728640,
    uploadDate: '2026-04-04T09:15:00',
  },
  {
    id: '4',
    name: 'Instalador_App.exe',
    type: 'exe',
    size: 5242880,
    uploadDate: '2026-04-03T16:45:00',
  },
  {
    id: '5',
    name: 'Documentos',
    type: 'folder',
    size: 0,
    uploadDate: '2026-04-02T11:00:00',
  },
  {
    id: '6',
    name: 'Logo_Empresa.png',
    type: 'image',
    size: 512000,
    uploadDate: '2026-04-07T08:30:00',
  },
  {
    id: '7',
    name: 'Manual_Usuario.pdf',
    type: 'pdf',
    size: 3145728,
    uploadDate: '2026-04-01T13:20:00',
  },
  {
    id: '8',
    name: 'Notas.txt',
    type: 'txt',
    size: 8192,
    uploadDate: '2026-04-06T17:10:00',
  },
  {
    id: '9',
    name: 'Presupuesto_Q1.docx',
    type: 'docx',
    size: 768000,
    uploadDate: '2026-03-30T10:00:00',
  },
  {
    id: '10',
    name: 'Base_Datos.zip',
    type: 'zip',
    size: 20971520,
    uploadDate: '2026-03-28T15:30:00',
  },
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return 'Hoy';
  } else if (diffInHours < 48) {
    return 'Ayer';
  } else {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
};
