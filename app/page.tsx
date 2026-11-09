"use client";

import { useState } from "react";
import { courses } from "@/data/courses";

export default function Home() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const displayedCourses = onlyAvailable
    ? courses.filter((course) => (course.seat ?? 0) - (course.booked ?? 0) > 0)
    : courses;

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#1a237e] px-6 py-14">

      {/* ── 헤더 ── */}
      <header className="flex flex-col items-center gap-3 mb-12 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 ring-2 ring-[#FFD700]/40">
          <span className="text-3xl">🎓</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          스킬투머니
        </h1>
        <p className="text-base sm:text-lg text-indigo-200 font-medium">
          배운 기술이 돈이 되는 원데이 클래스
        </p>
        {/* 금색 구분선 */}
        <div className="w-16 h-[3px] rounded-full bg-[#FFD700] mt-1" />
      </header>

      {/* ── 강좌 목록 헤더 및 필터 옵션 ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 max-w-5xl w-full">
        <h2 className="text-[#FFD700] font-bold text-lg tracking-widest uppercase">
          강좌 목록
        </h2>

        {/* 예약 가능한 강좌만 보기 체크박스 */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-indigo-100 hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="w-4 h-4 rounded accent-[#FFD700] cursor-pointer"
          />
          <span>예약 가능한 강좌만 보기</span>
        </label>
      </div>

      {/* ── 카드 그리드 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {displayedCourses.map((course) => {
          const seat = course.seat ?? 0;
          const booked = course.booked ?? 0;
          const remaining = seat - booked;
          const isFull = remaining <= 0;
          const isUrgent = remaining >= 1 && remaining <= 2;

          return (
            <div
              key={course.id}
              className="flex flex-col rounded-2xl bg-white/10 ring-1 ring-[#FFD700]/30 backdrop-blur-sm overflow-hidden hover:ring-[#FFD700]/70 hover:bg-white/[0.14] transition-all"
            >
              {/* 카드 상단 아이콘 띠 */}
              <div className="flex items-center justify-center py-7 bg-white/5">
                <span className="text-5xl">{course.icon || "📚"}</span>
              </div>

              {/* 카드 본문 */}
              <div className="flex flex-col flex-1 gap-2.5 px-5 pt-4 pb-5">
                <h3 className="text-white font-bold text-lg leading-snug">
                  {course.name}
                </h3>

                {/* 태그 목록 (강좌 이름 아래 작은 배지) */}
                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 -mt-0.5 mb-1">
                    {course.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#FFD700]/15 text-[#FFD700] ring-1 ring-[#FFD700]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {course.description && (
                  <p className="text-indigo-300 text-sm leading-relaxed flex-1">
                    {course.description}
                  </p>
                )}

                {/* 강의 일정 */}
                {course.date && (
                  <div className="flex items-center gap-1.5 text-xs text-indigo-200 mt-1">
                    <span>🗓️</span>
                    <span>일정: {course.date}</span>
                  </div>
                )}

                {/* 좌석 정보 */}
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={
                        isFull
                          ? "font-bold text-red-400"
                          : isUrgent
                          ? "font-bold text-red-400"
                          : "font-semibold text-indigo-200"
                      }
                    >
                      {isFull
                        ? "🔴 마감"
                        : isUrgent
                        ? `남은 좌석 ${remaining}석 (마감 임박)`
                        : `남은 좌석 ${remaining}석`}
                    </span>
                    <span className="text-indigo-400 text-xs">
                      정원 {seat}명
                    </span>
                  </div>
                  {/* 진행 바 */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull
                          ? "bg-red-400"
                          : isUrgent
                          ? "bg-red-400"
                          : "bg-[#FFD700]"
                      }`}
                      style={{
                        width: seat > 0 ? `${Math.min(100, (booked / seat) * 100)}%` : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* 수강료 */}
                <p className="text-[#FFD700] font-extrabold text-xl mt-2">
                  {course.price.toLocaleString("ko-KR")}
                  <span className="text-base font-semibold ml-0.5">원</span>
                </p>

                {/* 예약하기 버튼 */}
                <button
                  type="button"
                  disabled={isFull}
                  className={`mt-3 w-full rounded-full py-2.5 font-bold text-sm tracking-wide transition-all shadow-md ${
                    isFull
                      ? "bg-white/20 text-white/40 cursor-not-allowed"
                      : "bg-[#FFD700] text-[#1a237e] hover:bg-yellow-300 active:scale-95"
                  }`}
                >
                  {isFull ? "예약 마감" : "예약하기"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 푸터 ── */}
      <p className="mt-16 text-indigo-400 text-xs text-center">
        © 2026 스킬투머니. All rights reserved.
      </p>
    </main>
  );
}
