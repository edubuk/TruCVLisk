// CVDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";


// Register Times font (built-in)
Font.register({
  family: "Times-Roman",
  fonts: [
    { src:"#", fontWeight: "normal" }, // default Times
    { src:"#", fontWeight: "bold" }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#000"
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8,
    fontSize: 10,
  },
  contactItem: {
    marginHorizontal: 8,
    color:"#000000"
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottom: "1pt solid #000",
    paddingBottom: 2,
    marginBottom: 6,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  listItem: {
    marginLeft: 12,
    marginTop: 2,
  },
  pill: {
    border: "0.5pt solid #aaa",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 0,
    backgroundColor:"#f3f4f6",
    marginRight: 6,
    fontWeight:"bold",
    fontSize: 9,
  }
});

export const CVDocument = ({ cvData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{cvData.personalDetails.name}</Text>
        <View style={styles.contactRow}>
            <Image src="/phone.png" style={{ width: 10, height: 8}}/>
        <Text style={styles.contactItem}>{cvData.personalDetails.phoneNumber}</Text>
        <Image src="/email.png" style={{ width: 10, height: 10}}/>
          <Link style={styles.contactItem} src={`mailto:${cvData.personalDetails.email}`}>
         {cvData.personalDetails.email}
          </Link>
          <Image src="/linkedin.png" style={{ width: 10, height: 10 }}/>
          <Link style={styles.contactItem} src={cvData.personalDetails.linkedinProfile}>
          LinkedIn
          </Link>
          <Image src="/github.png" style={{ width: 10, height: 10 }}/>
          <Link style={styles.contactItem} src={cvData.personalDetails.githubProfile}>
          Github
          </Link>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {cvData.education.underGraduateCollege && (
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.bold}>{cvData.education.underGraduateCollege}</Text>
            <Text style={styles.italic}>{cvData.education.underGraduateDegree}</Text>
          </View>
          <View>
            <Text>
              {cvData.education.underGraduateDuration.duration.from} -{" "}
              {cvData.education.underGraduateDuration.duration.to}
            </Text>
            <Text>GPA: <Text style={styles.bold}>{cvData.education.underGraduateGPA}/10</Text></Text>
          </View>
        </View>
        )}
        {cvData.education.class12College && (
        <View style={styles.rowBetween}>
            <View>
        <Text style={styles.bold}>{cvData.education.class12College}</Text>
        <Text style={styles.italic}>Class XII | {cvData.education.class12Board}</Text>
         </View>
         <View>
        <Text>{cvData.education.class12Grade}</Text>
        </View>
        </View>
        )}
        {cvData.education.class10School && (
        <View style={styles.rowBetween}>
        <View>
        <Text style={styles.bold}>{cvData.education.class10School}</Text>
        <Text style={styles.italic}>Class X | {cvData.education.class10Board}</Text>
        </View>
        <View>
        <Text>{cvData.education.class10Grade}</Text>
        </View>
        </View>
        )}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {cvData.skills.map((s: any, i: number) => (
            <Text key={i} style={styles.pill}>{s.skillName}</Text>
          ))}
        </View>
      </View>

      {/* Experience */}
      {cvData.experience.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {cvData.experience.map((exp: any, i: number) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.bold}>{exp.company_name}</Text>
              <Text>{exp.duration.from} - {exp.duration.to}</Text>
            </View>
            <Text style={styles.italic}>{exp.job_role}</Text>
            {exp.description.split(".")
              .filter((d: string) => d.trim())
              .map((point: string, j: number) => (
                <Text key={j} style={styles.listItem}>• {point}</Text>
              ))}
          </View>
        ))}
      </View>
      )}

      {/* Projects */}
      {cvData.achievements.projects.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {cvData.achievements.projects.map((proj: any, i: number) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.bold}>{proj.project_name}</Text>
              <Text>{proj.duration.from} - {proj.duration.to}</Text>
            </View>
            {proj.description.split(".")
              .filter((d: string) => d.trim())
              .map((point: string, j: number) => (
                <Text key={j} style={styles.listItem}>• {point}</Text>
              ))}
          </View>
        ))}
      </View>
      )}

      {/* Courses */}
      {cvData.achievements.courses.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Courses</Text>
        {cvData.achievements.courses.map((course: any, i: number) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.bold}>{course.course_name} | {course.organization}</Text>
              <Text>{course.duration.from} - {course.duration.to}</Text>
            </View>
            {course.description.split(".")
              .filter((d: string) => d.trim())
              .map((point: string, j: number) => (
                <Text key={j} style={styles.listItem}>• {point}</Text>
              ))}
          </View>
        ))}
      </View>
      )}

      {/* Awards */}
      {cvData.achievements.awards.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Award & Achievements</Text>
        {cvData.achievements.awards.map((award: any, i: number) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.rowBetween}>
              <Text><Text style={styles.bold}>{award.award_name}</Text> | {award.awarding_organization}</Text>
              <Text>{award.date}</Text>
            </View>
            <Text style={styles.listItem}>• {award.description}</Text>
          </View>
        ))}
      </View>
      )}
    </Page>
  </Document>
);
