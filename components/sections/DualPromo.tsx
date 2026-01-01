'use client';

import { Container } from '@/components/ui/Container';

export function DualPromo() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <Container>
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

                    {/* Left Card: 혈관나이 검사 */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Circular Image */}
                        <div className="flex-shrink-0">
                            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-inner">
                                <img
                                    src="/images/promo-vascular-age.jpg"
                                    alt="혈관 나이 검사 일러스트"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to placeholder gradient
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg lg:text-xl font-bold text-neutral-900 mb-2">
                                나의 혈관나이 검사하기
                            </h3>
                            <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
                                간단한 문진으로 나의 혈관 건강 상태를 확인해보세요.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                            >
                                시작하기
                            </a>
                        </div>
                    </div>

                    {/* Right Card: 연구보고서 */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Thumbnail Image */}
                        <div className="flex-shrink-0">
                            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shadow-inner">
                                <img
                                    src="/images/promo-research-report.jpg"
                                    alt="나이트로바이옴 연구보고서 표지"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to placeholder gradient
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg lg:text-xl font-bold text-neutral-900 mb-2">
                                나이트로바이옴 연구보고서
                            </h3>
                            <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
                                발효 대사체 기반 NO 공급의 과학적 근거와 임상 데이터를 확인하세요.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-emerald-700 bg-white border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                            >
                                더 알아보기
                            </a>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
