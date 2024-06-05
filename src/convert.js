const formatIndex = ({ minutes, seconds, frames }) =>
  [minutes, seconds, frames]
    .map(part => part.toString().padStart(2, '0'))
    .join(':');

const emit = cue => {
  const result = [];

  result.push(`PERFORMER "${cue.performer}"`);
  result.push(`TITLE "${cue.title}"`);
  result.push(`FILE "${cue.file}" ${cue.format}`);

  cue.tracks.forEach((track, i) => {
    result.push(`  TRACK ${(i + 1).toString().padStart(2, '0')} AUDIO`);
    result.push(`    TITLE "${track.title}"`);
    result.push(`    INDEX 01 ${formatIndex(track.index)}`);
  });

  return result.join('\n');
};

const toIndex = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds, frames: 0 };
};

export default json => {
  const cue = {
    performer: json.uploader,
    title: json.fulltitle,
    file: json._filename,
    format: 'MP3',
    tracks: json.chapters.map(chapter => ({
      title: chapter.title,
      index: toIndex(chapter.start_time),
    })),
  };

  return emit(cue);
};
