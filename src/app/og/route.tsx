import { ImageResponse } from "next/og";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";

export const runtime = "edge";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";
  const font = fetch(
    new URL("../../../public/fonts/Inter.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "8rem",
          background: "#151515",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            fontFamily: "Inter",
            fontStyle: "normal",
            color: "white",
          }}
        >
          <span
            style={{
              fontSize: "8rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "pre-wrap",
              textWrap: "balance",
            }}
          >
            {title}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <img
              src={"https://" + baseURL + person.avatar}
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {person.name}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {person.role}
              </span>
            </div>
          </div>
          <div style={{ marginTop: "4rem" }}>
            <h2>Présentation personnelle</h2>
            <p>{person.bio}</p>
            <h2>Compétences</h2>
            <ul>
              {person.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <h2>Projets</h2>
            <ul>
              {person.projects.map((project) => (
                <li key={project.name}>
                  <strong>{project.name}</strong>: {project.description}
                </li>
              ))}
            </ul>
            <h2>Formations</h2>
            <ul>
              {person.education.map((edu) => (
                <li key={edu.institution}>
                  <strong>{edu.institution}</strong>: {edu.degree}
                </li>
              ))}
            </ul>
            <h2>Expériences professionnelles</h2>
            <ul>
              {person.experience.map((exp) => (
                <li key={exp.company}>
                  <strong>{exp.company}</strong>: {exp.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
