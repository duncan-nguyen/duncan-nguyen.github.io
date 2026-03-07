import RevealOnScroll from '../RevealOnScroll';

export default function ResearchSection() {
    return (
        <section className="py-24 px-6" id="research">
            <div className="max-w-6xl mx-auto">
                <RevealOnScroll className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl font-bold">Research &amp; Publications</h2>
                    <div className="hidden md:block h-px bg-brand-border flex-grow ml-12"></div>
                </RevealOnScroll>

                {/* ViLexCPO Card */}
                <RevealOnScroll className="group border border-brand-border hover:border-brand-blue transition-all duration-300 bg-white hover-lift">
                    {/* Paper header */}
                    <div className="p-8 md:p-12 pb-0 md:pb-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div className="flex items-center gap-4">
                                <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                                    SOICT 2025
                                </span>
                                <span className="text-green-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Accepted
                                </span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="pill-tag">NLP</span>
                                <span className="pill-tag">Preference Optimization</span>
                                <span className="pill-tag">Legal AI</span>
                                <span className="pill-tag">Multi-task Learning</span>
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-brand-blue transition-colors leading-tight">
                            ViLexCPO: A Multi-Task and Preference-Aligned Framework for Legal Question Answering
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            <strong>Quang-Dung Nguyen</strong> (First Author), Duc-Dung Nguyen, Huu-Tri-Dung Vo, Thanh-Huong Le
                            <span className="text-gray-300 mx-2">·</span>
                            Hanoi University of Science and Technology
                        </p>
                        <p className="text-gray-600 max-w-4xl mb-8 leading-relaxed">
                            A two-stage training framework for Vietnamese legal QA combining Multi-task Supervised
                            Fine-Tuning across three complementary tasks with Contrastive Preference Optimization (CPO)
                            to align model outputs with high-quality legal reasoning. Built on Qwen3-1.7B, demonstrating
                            that well-trained compact models can achieve competitive performance in complex legal reasoning.
                        </p>
                    </div>

                    {/* Training Pipeline Visualization */}
                    <div className="px-8 md:px-12 py-8 bg-gray-50 border-t border-brand-border">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Training Pipeline</h4>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0">
                            <div className="flex-1 bg-white border border-brand-border p-4 md:p-5">
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">Stage 0</div>
                                <div className="font-bold text-sm mb-1">Domain Pretraining</div>
                                <div className="text-xs text-gray-500">144K Vietnamese legal texts (laws, decrees, news)</div>
                            </div>
                            <div className="hidden md:block pipeline-connector mx-2"></div>
                            <div className="flex-1 bg-white border border-brand-border p-4 md:p-5">
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">Stage 1</div>
                                <div className="font-bold text-sm mb-1">Multi-task SFT</div>
                                <div className="text-xs text-gray-500">Citation Usefulness + MCQ + Citation Prediction</div>
                            </div>
                            <div className="hidden md:block pipeline-connector mx-2"></div>
                            <div className="flex-1 bg-white border-2 border-brand-blue p-4 md:p-5">
                                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">Stage 2</div>
                                <div className="font-bold text-sm mb-1">CPO Alignment</div>
                                <div className="text-xs text-gray-500">80K preference triplets (chosen / rejected)</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 md:hidden -mt-2">
                            <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>

                    {/* Key Results */}
                    <div className="px-8 md:px-12 py-8 border-t border-brand-border">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Key Results — VLSP LegalSLM Benchmark</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div>
                                <div className="text-3xl md:text-4xl font-extrabold text-brand-blue">91.5<span className="text-xl">%</span></div>
                                <div className="text-xs text-gray-500 mt-1">Avg Accuracy (Tasks 1&amp;2)</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-extrabold text-brand-blue">96.0<span className="text-xl">%</span></div>
                                <div className="text-xs text-gray-500 mt-1">Citation Usefulness</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-extrabold text-brand-blue">89.1<span className="text-xl">%</span></div>
                                <div className="text-xs text-gray-500 mt-1">BERT-F1 (Syllogism QA)</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-extrabold text-brand-blue">+44.4<span className="text-xl">%</span></div>
                                <div className="text-xs text-gray-500 mt-1">Improvement over Baseline</div>
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="overflow-x-auto">
                            <table className="results-table w-full text-left">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>ACC<sub className="text-[10px]">MCQ</sub></th>
                                        <th>ACC<sub className="text-[10px]">UC</sub></th>
                                        <th>ACC<sub className="text-[10px]">avg</sub></th>
                                        <th>% Imp.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500">Qwen3-1.7B Raw</td>
                                        <td>76.02%</td>
                                        <td>50.00%</td>
                                        <td>63.01%</td>
                                        <td className="text-gray-400">—</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500">Qwen3-1.7B Pretrain</td>
                                        <td>87.00%</td>
                                        <td>63.33%</td>
                                        <td>75.16%</td>
                                        <td>+19.3%</td>
                                    </tr>
                                    <tr>
                                        <td>SFT-2T + CPO</td>
                                        <td>86.30%</td>
                                        <td>88.00%</td>
                                        <td>87.15%</td>
                                        <td>+38.1%</td>
                                    </tr>
                                    <tr className="highlight-row">
                                        <td><strong>SFT-3T + CPO (Ours)</strong></td>
                                        <td><strong>87.00%</strong></td>
                                        <td><strong>96.01%</strong></td>
                                        <td><strong>91.49%</strong></td>
                                        <td><strong>+44.4%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">Results averaged over 3 runs with seeds {'{42, 84, 126}'}.</p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
