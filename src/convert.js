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

export default json => {
  const cue = {
    performer: json.uploader,
    title: json.fulltitle,
    file: json._filename,
    format: 'MP3',
    tracks: json.chapters.map(chapter => ({
      title: chapter.title,
      index: {
        minutes: Math.floor(chapter.start_time / 60),
        seconds: chapter.start_time % 60,
        frames: 0,
      },
    })),
  };

  return emit(cue);
};
