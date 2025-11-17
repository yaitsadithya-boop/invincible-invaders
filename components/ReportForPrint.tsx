import React, { forwardRef } from 'react';
import type { AnalysisResults } from '../types';
import { Icon } from './common/Icon';

const ReportForPrint = forwardRef<HTMLDivElement, { results: AnalysisResults }>(({ results }, ref) => {
    const { skillGaps, resources, resumeAnalysis, rewrittenResume, roadmap } = results;

    const SkillList = ({ title, skills }: { title: string, skills: string[] }) => (
        <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-200 pb-2">{title}</h4>
            {skills && skills.length > 0 ? (
                <ul className="space-y-2 pl-5 list-disc">
                    {skills.map((skill, index) => (
                        <li key={index} className="text-gray-600">{skill}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No gaps identified in this area.</p>
            )}
        </div>
    );
    
    return (
        <div ref={ref} className="p-10 bg-white text-gray-800" style={{ width: '1200px' }}>
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold text-blue-700">CareerBoard Analysis Report</h1>
                <p className="text-gray-500 mt-2 text-lg">Your personalized path to career success.</p>
            </header>

            {/* Section 1: Skill Gaps */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">1. Skill Gap Analysis</h2>
                <p className="text-gray-600 mb-6">Based on your resume and target role, here are the key skills to focus on.</p>
                <div className="grid grid-cols-2 gap-8">
                    <SkillList title="Core Technical Skills" skills={skillGaps.missingCoreSkills} />
                    <SkillList title="Most Demanding Skills" skills={skillGaps.missingDemandingSkills} />
                </div>
            </section>

            {/* Section 2: Learning Resources */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">2. Curated Learning Resources</h2>
                <div className="space-y-6">
                    {Object.keys(resources).map(skill => (
                        <div key={skill} className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{skill}</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-bold">Practice Questions</h4>
                                    <ul className="space-y-1 mt-2">
                                        {(resources[skill]?.practiceQuestions || []).map((q, i) => <li key={i} className="text-sm text-gray-600 truncate">{q.platform}: {q.text}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold">Project Ideas</h4>
                                    <ul className="space-y-1 mt-2 list-disc pl-5">
                                        {(resources[skill]?.projectIdeas || []).map((p, i) => <li key={i} className="text-sm text-gray-600">{typeof p === 'string' ? p : (p as any).text}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold">Learning Links</h4>
                                    <ul className="space-y-1 mt-2">
                                        {(resources[skill]?.learningResources || []).map((r, i) => <li key={i} className="text-sm text-gray-600 truncate">{r.title}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Resume Review */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">3. Resume Review</h2>
                 <div className="mb-8 p-4 border rounded-lg">
                    <h3 className="text-xl font-semibold">Initial Analysis</h3>
                    <p><strong>ATS Score:</strong> {resumeAnalysis.atsScore}/100</p>
                    <p><strong>Clarity:</strong> {resumeAnalysis.scoreBreakdown.clarity}</p>
                    <p><strong>Impact:</strong> {resumeAnalysis.scoreBreakdown.impact}</p>
                 </div>
                 <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-xl font-semibold">AI-Enhanced Resume (New ATS Score: {rewrittenResume.newAtsScore}/100)</h3>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-xs text-gray-700 bg-white p-2 border rounded">{rewrittenResume.rewrittenText}</pre>
                 </div>
            </section>
            
            {/* Section 4: Roadmap */}
            <section>
                 <h2 className="text-3xl font-bold text-blue-600 mb-6">4. Personalized 4-Week Roadmap</h2>
                 <div className="space-y-6">
                    {(roadmap.roadmap || []).map(week => (
                        <div key={week.week} className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold">Week {week.week}: {week.focus}</h3>
                            {(week.dailyPlan || []).map(day => (
                                <div key={day.day} className="mt-2">
                                    <h4 className="font-bold">{day.day}</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                        {(day.tasks || []).map((task, i) => {
                                            if (typeof task === 'string') {
                                                return <li key={i}>{task.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')}</li>;
                                            }
                                            if (typeof task === 'object' && task !== null && 'task' in task) {
                                                const taskObj = task as { task: string; link?: string };
                                                return (
                                                    <li key={i}>{taskObj.task}{taskObj.link ? ` - ${taskObj.link}` : ''}</li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                 </div>
            </section>
        </div>
    );
});

export default ReportForPrint;