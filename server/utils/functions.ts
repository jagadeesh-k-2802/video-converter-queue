export const formatMapper = (arg: string): string => {
  const formats = {
    mkv: 'matroska',
    mp4: 'mp4',
    mov: 'mov'
  };

  return formats[arg];
};
