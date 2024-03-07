import type { FC } from 'react';
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

  const isActive = canDrop && isOver;

  return (
    <div className="drop-area" ref={drop}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  );
};

export default TargetBox;
