import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles as styles } from '../assets/dummystyle'
import { useNavigate } from 'react-router-dom'
import { LucideFilePlus } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const Dashboard = () => {

  const navigate= useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false)
  const [allResume, setAllResume] = useState([]);
  const [loading , setLoading] = useState(true)
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };
  // IT WILL SHOW IF COMPLETED OR FILLED IT WILL DO ++

  const fetchAllResume = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)
      // ADD COMPLETION PERCENTAGE TO EACH RESUMES
      const resumeWithCompletion = response.data.map(resume =>({
        ...resume,
        completion: calculateCompletion(resume)
      }))

      setAllResume(resumeWithCompletion)
      
    } catch (error) {
      console.error('Error fetching resumes:',error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllResume();
  },[]);


  return (
    
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>

          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
            <p className={styles.headerSubtitle}>
              {allResume.length > 0 ? `you have ${allResume.length} resume${allResume.length !==1 ? 's' : ''}`
              : 'start building your professional resume'}
            </p>
          </div>

          <div className='flex gap-4'>
            <button className={styles.createButton}
            onClick={() => setOpenCreateModel(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={18}/>
              </span>
            </button>
          </div>

        </div>

        {/* LOADING STATES */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && allResume.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className='text-violet-600'/>
            </div>

            <h3 className={styles.emptyTitle}>
              No Rseume Yet 
            </h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet. start building your professional resume to land your 
              dream job.
            </p>

            <button className={styles.createButton} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.createButtonOverlay}>
              </div>
              <span className={styles.createButtonContent}>
                Create Your First resume
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20}/>
              </span>
            </button>

          </div>
        )}

        {/* GRID VIEW */}
        {!loading && allResume.length > 0 && (
          <div className={styles.grid}>
            <div className={styles.newResumeCard} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className='text-white' />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}> Start building your career</p>
            </div>
          </div>
        )}


      </div>
    </DashboardLayout>
  )
}

export default Dashboard