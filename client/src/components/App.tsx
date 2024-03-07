import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import CompletedView from './CompletedView';
import Api from '../services/api';

const App = () => {
  const [fromValue, setFromValue] = useState<string>('mp4');
  const [toValue, setToValue] = useState<string>('mkv');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const uploadId = localStorage.getItem('uploadId');

    if (uploadId !== null) {
      setIsCompleted(true);
    }
  }, []);

  const onFileDrop = (file: File) => {
    setFile(file);
    if (file == null) return;
    const extension = file?.name.split('.');
    setFromValue(extension[extension.length - 1]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file == null) return;

    if (fromValue === toValue) {
      alert('From type and to type should not be same');
      return;
    }

    await Api.uploadFile(fromValue, toValue, file, event => {
      setProgress(Math.round((event.loaded * 100) / (event.total ?? 100)));
    });

    setIsCompleted(true);
  };

  const onUploadNew = () => {
    localStorage.removeItem('uploadId');
    setFile(null);
    setIsCompleted(false);
    setFromValue('mp4');
    setToValue('mkv');
    setProgress(0);
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Video Converter</h1>

            {isCompleted ? (
              <CompletedView onUploadNew={onUploadNew} />
            ) : (
              <>
                <select
                  name="from"
                  id="from"
                  value={fromValue}
                  onChange={val => setFromValue(val.target.value)}
                  disabled={file !== null}
                >
                  <option value="mp4">MP4</option>
                  <option value="mkv">MKV</option>
                  <option value="mov">MOV</option>
                </select>

                <select
                  name="to"
                  id="to"
                  value={toValue}
                  onChange={val => setToValue(val.target.value)}
                >
                  <option value="mkv">MKV</option>
                  <option value="mp4">MP4</option>
                  <option value="mov">MOV</option>
                </select>

                {file !== null ? (
                  <p className="file">
                    {file.name} - {file.type} -{' '}
                    {Math.round(file.size / 1000000)} MB
                  </p>
                ) : (
                  <TargetBox onDrop={onFileDrop} />
                )}

                {progress > 0 ? (
                  <progress value={progress} max={100} />
                ) : (
                  <button type="submit" disabled={file === null}>
                    Start Convert
                  </button>
                )}
              </>
            )}
          </form>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
