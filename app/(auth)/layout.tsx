type Props = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-full w-full grid md:place-items-center bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/3 bottom-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {children}
    </div>
  );
}
