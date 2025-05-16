type Question = {
  question: string;
  options: string[];
  correct: string;
};

export function parseQuestions(raw: string): Question[] {
  const questions: Question[] = [];
  const blocks = raw.split(/\n{2,}/); 
  for (let block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 5) continue;

    const question = lines[0].replace(/^\d+\.\s*/, '');
    const options = lines.slice(1, 5).map(line => line.replace(/^[A-D]\.\s*/, ''));
    const correctLine = lines.find(l => l.toLowerCase().includes('correct')) || '';
    const correctMatch = correctLine.match(/[A-D]/);
    const correct = correctMatch ? options['ABCD'.indexOf(correctMatch[0])] : '';

    questions.push({ question, options, correct });
  }

  return questions;
}
