'use client';

import { useState, useEffect } from 'react';
import { getAllContent, Content, getCategories } from '@/lib/supabase/database';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Check, AlertCircle, RefreshCw, Trophy } from 'lucide-react';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export default function QuizPage() {
    // States: 'selection' | 'generating' | 'quiz' | 'result'
    const [step, setStep] = useState<'selection' | 'generating' | 'quiz' | 'result'>('selection');

    // Selection Data
    const [contents, setContents] = useState<Content[]>([]);
    const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Quiz Data
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]); // User's answers indices
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch available contents
    useEffect(() => {
        const load = async () => {
            const data = await getAllContent();
            setContents(data);
            setLoadingData(false);
        };
        load();
    }, []);

    const toggleSelection = (id: string) => {
        setSelectedContentIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleStartQuiz = async () => {
        if (selectedContentIds.length === 0) return;
        setStep('generating');

        try {
            // Prepare content text for AI
            const selectedContents = contents
                .filter(c => selectedContentIds.includes(c.id || ''))
                .map(c => ({
                    title: c.title,
                    text: c.blocks?.filter(b => b.type === 'text' || b.type === 'image-text').map(b => b.content).join('\n') || c.description
                }));

            const response = await fetch('/api/quiz/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: selectedContents }),
            });

            const data = await response.json();

            if (data.quiz && data.quiz.length > 0) {
                setQuizQuestions(data.quiz);
                setStep('quiz');
                setScore(0);
                setCurrentQuestionIndex(0);
                setAnswers([]);
                setSelectedOption(null);
                setShowExplanation(false);
            } else {
                alert('Não foi possível gerar o quiz. Tente selecionar mais conteúdos.');
                setStep('selection');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao gerar quiz.');
            setStep('selection');
        }
    };

    const handleAnswer = () => {
        if (selectedOption === null) return;

        const currentQ = quizQuestions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQ.correctIndex;

        if (isCorrect) setScore(s => s + 1);

        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setStep('result');
        }
    };

    const toggleSelectAll = () => {
        if (selectedContentIds.length === contents.length) {
            setSelectedContentIds([]);
        } else {
            setSelectedContentIds(contents.map(c => c.id || ''));
        }
    };

    if (loadingData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#760B26]">Quiz Interativo</h1>
                    <p className="mt-2 text-lg text-gray-600">Teste seus conhecimentos com perguntas geradas por IA</p>
                </div>

                {/* SELECTION STEP */}
                {step === 'selection' && (
                    <Card className="shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Selecione os Conteúdos</h2>
                                <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                                    {selectedContentIds.length === contents.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                                </Button>
                            </div>

                            <div className="grid gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                {contents.map(content => (
                                    <div
                                        key={content.id}
                                        onClick={() => content.id && toggleSelection(content.id)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${content.id && selectedContentIds.includes(content.id)
                                                ? 'border-[#760B26] bg-[#760B26]/5'
                                                : 'border-gray-200 hover:border-[#760B26]/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${content.id && selectedContentIds.includes(content.id) ? 'bg-[#760B26] border-[#760B26]' : 'border-gray-300'
                                                }`}>
                                                {content.id && selectedContentIds.includes(content.id) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{content.title}</h3>
                                                <p className="text-sm text-gray-500">{content.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    className="w-full text-lg py-6 bg-[#760B26] hover:bg-[#5a081d]"
                                    disabled={selectedContentIds.length === 0}
                                    onClick={handleStartQuiz}
                                >
                                    Gerar Quiz com IA
                                </Button>
                                {selectedContentIds.length === 0 && (
                                    <p className="text-center text-sm text-gray-500 mt-2">Selecione pelo menos um conteúdo para começar.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* GENERATING STEP */}
                {step === 'generating' && (
                    <div className="text-center py-20">
                        <Spinner size={64} className="mx-auto mb-6 text-[#760B26]" />
                        <h2 className="text-2xl font-bold text-gray-800 animate-pulse">Criando perguntas personalizadas...</h2>
                        <p className="text-gray-600 mt-2">A inteligência artificial está lendo os conteúdos selecionados.</p>
                    </div>
                )}

                {/* QUIZ STEP */}
                {step === 'quiz' && (
                    <Card className="shadow-xl">
                        <CardContent className="p-8">
                            <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
                                <span>Questão {currentQuestionIndex + 1} de {quizQuestions.length}</span>
                                <span>Pontuação: {score}</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                                {quizQuestions[currentQuestionIndex].question}
                            </h3>

                            <div className="space-y-3">
                                {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                                    let optionClass = "border-gray-200 hover:bg-gray-50";

                                    if (showExplanation) {
                                        if (idx === quizQuestions[currentQuestionIndex].correctIndex) {
                                            optionClass = "border-green-500 bg-green-50 text-green-700";
                                        } else if (idx === selectedOption) {
                                            optionClass = "border-red-500 bg-red-50 text-red-700";
                                        } else {
                                            optionClass = "border-gray-200 opacity-50";
                                        }
                                    } else if (selectedOption === idx) {
                                        optionClass = "border-[#760B26] bg-[#760B26]/10 text-[#760B26]";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            disabled={showExplanation}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${optionClass}`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {showExplanation && (
                                <div className={`mt-6 p-4 rounded-lg ${selectedOption === quizQuestions[currentQuestionIndex].correctIndex
                                        ? 'bg-green-100 border-l-4 border-green-500'
                                        : 'bg-red-100 border-l-4 border-red-500'
                                    }`}>
                                    <h4 className="font-bold flex items-center gap-2 mb-2">
                                        {selectedOption === quizQuestions[currentQuestionIndex].correctIndex
                                            ? <><Check className="w-5 h-5" /> Correto!</>
                                            : <><AlertCircle className="w-5 h-5" /> Incorreto</>
                                        }
                                    </h4>
                                    <p className="text-sm">
                                        {quizQuestions[currentQuestionIndex].explanation}
                                    </p>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                {!showExplanation ? (
                                    <Button
                                        className="w-full py-6 bg-[#760B26] hover:bg-[#5a081d]"
                                        onClick={handleAnswer}
                                        disabled={selectedOption === null}
                                    >
                                        Responder
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full py-6"
                                        onClick={handleNextQuestion}
                                    >
                                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* RESULT STEP */}
                {step === 'result' && (
                    <Card className="shadow-xl text-center">
                        <CardContent className="p-10">
                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trophy className="w-10 h-10 text-yellow-600" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Finalizado!</h2>
                            <p className="text-gray-600 mb-8">Você completou o desafio de anatomia.</p>

                            <div className="text-5xl font-black text-[#760B26] mb-2">{score}/{quizQuestions.length}</div>
                            <p className="text-gray-500 mb-8">Acertos</p>

                            <div className="grid gap-4 max-w-sm mx-auto">
                                <Button
                                    className="w-full py-6 bg-[#760B26] hover:bg-[#5a081d]"
                                    onClick={() => setStep('selection')}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Novo Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
}
