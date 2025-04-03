import React from "react";
import { Link } from "react-router-dom";
import RecentEdits from "../components/RecentEdits";

const Characters: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* 왼쪽 섹션: 인물 사전 시트 */}
        <div className="w-full lg:flex-[5]">
          <div className="bg-white rounded-lg border border-gray-800 p-5 lg:p-12">
            <div className="flex justify-between items-center mb-5 lg:mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
                인물사전
              </h2>
              <Link
                to="/wiki/create"
                className="bg-gray-700 text-white text-sm lg:text-base font-medium py-1.5 lg:py-2 px-3 lg:px-4 transition-colors"
              >
                작성하기
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㄱ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>가나</li>
                  <li>가람</li>
                  <li>가을</li>
                  <li>가을</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㄴ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>나나</li>
                  <li>나리</li>
                  <li>나무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㄷ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>다나</li>
                  <li>다람</li>
                  <li>다음</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㄹ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>라나</li>
                  <li>라리</li>
                  <li>라무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅁ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>마나</li>
                  <li>마리</li>
                  <li>마무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅂ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>바나</li>
                  <li>바리</li>
                  <li>바무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅅ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>사나</li>
                  <li>사리</li>
                  <li>사무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅇ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>아나</li>
                  <li>아리</li>
                  <li>아무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅈ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>자나</li>
                  <li>자리</li>
                  <li>자무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅊ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>차나</li>
                  <li>차리</li>
                  <li>차무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅋ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>카나</li>
                  <li>카리</li>
                  <li>카무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅌ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>타나</li>
                  <li>타리</li>
                  <li>타무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅍ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>파나</li>
                  <li>파리</li>
                  <li>파무</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  ㅎ
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>하나</li>
                  <li>하리</li>
                  <li>하무</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  a
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Anna</li>
                  <li>Alice</li>
                  <li>Alex</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  b
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Bob</li>
                  <li>Bill</li>
                  <li>Ben</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  c
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Charlie</li>
                  <li>Chris</li>
                  <li>Carol</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  d
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>David</li>
                  <li>Dan</li>
                  <li>Diana</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  e
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Emma</li>
                  <li>Eva</li>
                  <li>Eric</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  f
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Frank</li>
                  <li>Fred</li>
                  <li>Fiona</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  g
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>George</li>
                  <li>Grace</li>
                  <li>Gary</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  h
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Henry</li>
                  <li>Helen</li>
                  <li>Harry</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  i
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Ian</li>
                  <li>Ivy</li>
                  <li>Isaac</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  j
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Jack</li>
                  <li>Jane</li>
                  <li>John</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  k
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Kate</li>
                  <li>Kevin</li>
                  <li>Kim</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  l
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Lucy</li>
                  <li>Luke</li>
                  <li>Laura</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  m
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Mike</li>
                  <li>Mary</li>
                  <li>Mark</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  n
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Nick</li>
                  <li>Nancy</li>
                  <li>Neil</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  o
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Oliver</li>
                  <li>Olivia</li>
                  <li>Oscar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  p
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Peter</li>
                  <li>Paul</li>
                  <li>Pat</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  q
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Quinn</li>
                  <li>Quincy</li>
                  <li>Quinn</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  r
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Rachel</li>
                  <li>Ryan</li>
                  <li>Rose</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  s
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Sam</li>
                  <li>Sarah</li>
                  <li>Steve</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  t
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Tom</li>
                  <li>Tina</li>
                  <li>Tim</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  u
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Uma</li>
                  <li>Ursula</li>
                  <li>Ulysses</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  v
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Victor</li>
                  <li>Vera</li>
                  <li>Vince</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  w
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>William</li>
                  <li>Wendy</li>
                  <li>Walter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  x
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Xavier</li>
                  <li>Xena</li>
                  <li>Xander</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  y
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Yvonne</li>
                  <li>Yolanda</li>
                  <li>Yuri</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  z
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>Zach</li>
                  <li>Zoe</li>
                  <li>Zack</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  0
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>0</li>
                  <li>0</li>
                  <li>0</li>
                  <li>0</li>
                  <li>0</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  1
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>1</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  2
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>2</li>
                  <li>2</li>
                  <li>2</li>
                  <li>2</li>
                  <li>2</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  3
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>3</li>
                  <li>3</li>
                  <li>3</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  4
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>4</li>
                  <li>4</li>
                  <li>4</li>
                  <li>4</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  5
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                  <li>5</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  6
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>6</li>
                  <li>6</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  7
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>7</li>
                  <li>7</li>
                  <li>7</li>
                  <li>7</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  8
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>8</li>
                  <li>8</li>
                  <li>8</li>
                  <li>8</li>
                  <li>8</li>
                </ul>
              </div>
              <div>
                <h3 className="text-s lg:text-s mb-2 bg-gray-700 text-white py-1 px-2 text-left font-semibold">
                  9
                </h3>
                <ul className="list-none pl-2 text-sm text-gray-600 space-y-1">
                  <li>9</li>
                  <li>9</li>
                  <li>9</li>
                  <li>9</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 최근 편집 내용 */}
        <div className="w-full lg:flex-[1]">
          <RecentEdits />
        </div>
      </div>
    </div>
  );
};

export default Characters;
