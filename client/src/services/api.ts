import axios, { AxiosProgressEvent } from 'axios';

class Api {
  static url = 'http://localhost:3000';

  static async uploadFile(
    from: string,
    to: string,
    file: File,
    onUploadProgress: (event: AxiosProgressEvent) => void
  ) {
    const formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('file', file);

    const { data } = await axios.post(`${Api.url}/upload`, formData, {
      onUploadProgress
    });

    localStorage.setItem('uploadId', data.id);
  }

  static async getStatus(id: string) {
    const { data } = await axios.get(`${Api.url}/status/${id}`);
    return data;
  }
}

export default Api;
