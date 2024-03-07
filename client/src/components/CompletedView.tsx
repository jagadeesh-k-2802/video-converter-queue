import { useEffect, useState } from 'react';
import Api from '../services/api';

const CompletedView = ({ onUploadNew }: { onUploadNew: () => void }) => {
  const [data, setData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const uploadId = localStorage.getItem('uploadId');

    const interval = setInterval(() => {
      (async () => {
        if (uploadId !== null && data === null) {
          const data = await Api.getStatus(uploadId);
          if (data.isDone) setData(data);
        }
      })();
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return data !== null ? (
    <>
      <p className="info">Your video has been successfully converted</p>
      <a
        href={`http://localhost:3000/${data.url.split('/').slice(2).join('/')}`}
        download
      >
        Download Video
      </a>

      <button onClick={onUploadNew}>Upload New</button>
    </>
  ) : (
    <>
      <p>Your video is processing...</p>
      <button onClick={onUploadNew}>Upload New</button>
    </>
  );
};

export default CompletedView;
