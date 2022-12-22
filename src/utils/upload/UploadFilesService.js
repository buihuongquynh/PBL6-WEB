import http from './http-common';
class UploadFilesService {
	upload(file, onUploadProgress, id) {
		let formData = new FormData();
		formData.append('image', file);
		return http.post(`/uploadAvt/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress,
		});
	}
}

export default new UploadFilesService();
