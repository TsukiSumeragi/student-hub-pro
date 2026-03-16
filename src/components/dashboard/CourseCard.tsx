import { PlayCircle, BookOpen, Calendar } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  mentor: string;
  progress: number;
  lectures: number;
  joined: string;
  image: string;
}

export function CourseCard({ title, description, mentor, progress, lectures, joined, image }: CourseCardProps) {
  return (
    <div className="bg-card rounded-xl card-shadow overflow-hidden group hover:card-shadow-hover transition-all duration-200 hover:-translate-y-0.5">
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-foreground leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-xs text-muted-foreground">
          Mentor: <span className="font-medium text-foreground">{mentor}</span>
        </p>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {lectures} Lectures
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {joined}
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-150">
            <PlayCircle className="w-4 h-4" />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
