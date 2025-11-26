export interface UserAvatarProps {
  src?: string;
  alt: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  return props.src ? (
    <img src={props.src} alt={props.alt} className="w-10 h-10 rounded-full" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
      <span className="font-bold text-white">{props.alt.toUpperCase()}</span>
    </div>
  );
}
