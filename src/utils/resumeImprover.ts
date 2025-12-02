export const improveResume = (resumeText: string, missingKeywords: string[]): string => {
  let improved = resumeText;

  const actionVerbs = [
    'Spearheaded', 'Orchestrated', 'Pioneered', 'Architected', 'Optimized',
    'Streamlined', 'Accelerated', 'Transformed', 'Implemented', 'Developed'
  ];

  const weakVerbs = ['did', 'made', 'worked on', 'responsible for', 'helped with', 'was part of'];

  weakVerbs.forEach((verb, index) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    if (index < actionVerbs.length) {
      improved = improved.replace(regex, actionVerbs[index]);
    }
  });

  if (missingKeywords.length > 0) {
    improved += '\n\n## Additional Relevant Skills\n';
    improved += missingKeywords.slice(0, 10).join(' • ') + '\n';
  }

  return improved;
};

export const downloadResume = (text: string, filename: string = 'improved-resume.txt') => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
