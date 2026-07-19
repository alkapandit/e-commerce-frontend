const SocialLoginButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">Or continue with</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#3b5998] text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span aria-hidden className="text-base leading-none">
            f
          </span>
          Facebook
        </button>
        <button
          type="button"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#4285f4] text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span aria-hidden className="text-base leading-none">
            G
          </span>
          Google
        </button>
      </div>
    </div>
  )
}

export default SocialLoginButtons
