import type { ChangeEvent, FC } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

export interface TargetBoxProps {
  onDrop: (file: File) => void;
}

const TargetBox: FC<TargetBoxProps> = props => {
  const { onDrop } = props;

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: File[] }) {
        if (item.files[0].type.includes('video')) {
          if (onDrop) onDrop(item.files[0]);
        } else {
          alert('Upload only video files');
        }
      },
      canDrop() {
        return true;
      },
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        };
      }
    }),
    [props]
  );

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files !== null && files?.length > 0) {
      if (files[0].type.includes('video')) {
        if (onDrop) onDrop(files[0]);
      } else {
        alert('Upload only video files');
      }
    }
  };

  const isActive = canDrop && isOver;

  return (
    <div className="drop-area" ref={drop}>
      <input
        type="file"
        name="file"
        id="file"
        accept="video/*"
        title=""
        onChange={onFileSelect}
      />

      {isActive ? 'Release to drop' : 'Drag file here or click to select file'}
    </div>
  );
};

export default TargetBox;
