import { FC } from 'react'

type AgeGroup = "4-7" | "8-12" | "13-17"

interface QuizGameProps {
    ageGroup: AgeGroup
    onComplete: (score: number) => void
    onClose: () => void
}

declare const QuizGame: FC<QuizGameProps>
export default QuizGame 