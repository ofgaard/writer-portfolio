import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
      </div>

      <div className="prose mx-auto">
        <div className="text-center mb-8">
          <Image 
            src="https://placehold.co/200x200?text=Profile" 
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold">Oliver Fruergaard</h2>
          <p className="text-lg text-muted-foreground">Writer & Journalist</p>
        </div>

        <div className="text-left">
          <h3 className="text-xl font-semibold mb-3">About</h3>
          <p className="mb-4">
            A dedicated journalist with expertise in investigative reporting and press communications. 
            Specializing in urban development, political analysis, and social issues.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Experience</h3>
          <p className="mb-4">
            Contributing writer for major publications, with a focus on in-depth analysis and 
            comprehensive coverage of current affairs.
          </p>

          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>
            For inquiries and collaborations, please reach out through the contact form or 
            connect via professional networks.
          </p>
        </div>
      </div>
    </div>
  );
}