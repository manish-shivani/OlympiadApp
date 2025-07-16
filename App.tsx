import React, { useState, useCallback, useEffect } from 'react';
import { User, MockTest, TestAttempt, ViewState, Grade, Subject, Question, Admin, Student, StudentProfile } from './types';
import { MOCK_TESTS, MOCK_SUBJECTS, MOCK_USERS } from './mockData';
import Dashboard from './components/Dashboard';
import TestInstructions from './components/TestInstructions';
import TestRunner from './components/TestRunner';
import TestResult from './components/TestResult';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import AdminDashboard from './components/AdminDashboard';
import { login, registerStudent } from './services/authService';
import TestEditor from './components/TestEditor';
import TestAnalysis from './components/TestAnalysis';
import UserProfile from './components/UserProfile';


const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('olympiad_users');
    return savedUsers ? JSON.parse(savedUsers) : MOCK_USERS;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('olympiad_currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [availableTests, setAvailableTests] = useState<MockTest[]>(() => {
    const savedTests = localStorage.getItem('olympiad_tests');
    return savedTests ? JSON.parse(savedTests) : MOCK_TESTS;
  });
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const savedSubjects = localStorage.getItem('olympiad_subjects');
    return savedSubjects ? JSON.parse(savedSubjects) : MOCK_SUBJECTS;
  });

  const [viewState, setViewState] = useState<ViewState>({ view: 'dashboard' });
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('olympiad_users', JSON.stringify(users));
  }, [users]);
  
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('olympiad_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('olympiad_currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('olympiad_tests', JSON.stringify(availableTests));
  }, [availableTests]);

  useEffect(() => {
    localStorage.setItem('olympiad_subjects', JSON.stringify(subjects));
  }, [subjects]);


  // --- AUTH HANDLERS ---
  const handleLogin = (email: string, password: string): boolean => {
    const user = login(email, password, users);
    if (user) {
      setCurrentUser(user);
      setViewState({ view: 'dashboard' });
      setLoginSuccessMessage('');
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView('login');
  };
  
  const handleRegister = (details: Omit<StudentProfile, 'grade'> & { grade: Grade, email: string, password: string }): { success: boolean; message: string } => {
    const result = registerStudent(details, users);
    if (result.user) {
      setUsers(prevUsers => [...prevUsers, result.user!]);
      setAuthView('login');
      setLoginSuccessMessage('Registration successful! Please log in.');
      return { success: true, message: '' };
    }
    return { success: false, message: result.error || 'Registration failed.' };
  };

  const switchToRegister = () => {
    setLoginSuccessMessage('');
    setAuthView('register');
  }
  const switchToLogin = () => setAuthView('login');


  // --- STUDENT HANDLERS ---
  const handlePurchase = useCallback((test: MockTest) => {
    if (currentUser?.role !== 'student') return;
    
    const studentUser = currentUser as Student;
    if (studentUser.purchasedTestIds.includes(test.id)) {
      return; // Already purchased
    }
    
    const newPurchase = {
      id: `purchase_${Date.now()}`,
      testId: test.id,
      testName: `${subjects.find(s => s.id === test.subjectId)?.name} - ${test.topic}`,
      amount: test.price,
      date: new Date().toISOString(),
    };

    const updatedUser: Student = {
      ...studentUser,
      purchasedTestIds: [...studentUser.purchasedTestIds, test.id],
      purchaseHistory: [...studentUser.purchaseHistory, newPurchase],
    };

    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  }, [subjects, currentUser]);
  
  const handleStartTest = useCallback((test: MockTest) => {
    if (currentUser?.role !== 'student') return;

    const studentUser = currentUser as Student;
    const attemptsForTest = studentUser.testHistory.filter(h => h.testId === test.id).length;

    if (attemptsForTest >= 3) {
      console.warn(`Attempt blocked: Maximum attempts (3) reached for test ${test.id}`);
      return;
    }
    setViewState({ view: 'instructions', test });
  }, [currentUser]);

  const handleBeginTest = useCallback((test: MockTest) => {
    setViewState({ view: 'test_runner', test });
  }, []);

  const handleTestComplete = useCallback((
    test: MockTest,
    score: number,
    questions: Question[],
    userAnswers: (number | null)[]
  ) => {
    if (currentUser?.role !== 'student') return;

    const newAttempt: TestAttempt = {
      testId: test.id,
      testName: `${subjects.find(s => s.id === test.subjectId)?.name} - ${test.topic}`,
      score,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
      questions: questions,
      userAnswers: userAnswers,
    };
    
    setCurrentUser(prevUser => {
        if (!prevUser || prevUser.role !== 'student') return prevUser;
        const studentUser = prevUser as Student;
        const updatedUser = {
            ...studentUser,
            testHistory: [...studentUser.testHistory, newAttempt],
        };
        setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
        return updatedUser;
    });

    setViewState({ view: 'result', attempt: newAttempt });
  }, [subjects, currentUser]);

  const handleViewAnalysis = useCallback((attempt: TestAttempt) => {
    setViewState({ view: 'analysis', attempt });
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setViewState({ view: 'dashboard' });
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setViewState({ view: 'profile' });
  }, []);

  const handleUpdateProfile = useCallback((updatedProfile: StudentProfile, currentPassword?: string, newPassword?: string): { success: boolean; message: string } => {
    if (currentUser?.role !== 'student') return { success: false, message: "Not a student." };
    
    let userToUpdate = { ...currentUser } as Student;

    // Password change logic
    if (currentPassword && newPassword) {
      if (userToUpdate.password !== currentPassword) {
        return { success: false, message: "Current password does not match." };
      }
      userToUpdate = { ...userToUpdate, password: newPassword };
    }

    // Profile details update
    userToUpdate = { ...userToUpdate, profile: updatedProfile };

    setCurrentUser(userToUpdate);
    setUsers(prevUsers => prevUsers.map(u => u.id === userToUpdate.id ? userToUpdate : u));
    
    return { success: true, message: "Profile updated successfully!" };
  }, [currentUser]);


  // --- ADMIN HANDLERS ---
  const handleSaveTest = (testToSave: MockTest) => {
    setAvailableTests(prevTests => {
      const existingIndex = prevTests.findIndex(t => t.id === testToSave.id);
      if (existingIndex > -1) {
        const newTests = [...prevTests];
        newTests[existingIndex] = testToSave;
        return newTests;
      } else {
        return [...prevTests, { ...testToSave, id: `test_${Date.now()}` }];
      }
    });
    setViewState({ view: 'dashboard' });
  };

  const handleDeleteTest = (testId: string) => {
    setAvailableTests(prev => prev.filter(t => t.id !== testId));
  };
  
  const handleEditTest = (test: MockTest) => {
    setViewState({ view: 'edit_test', test });
  };
  
  const handleAddNewTest = () => {
    const newTestTemplate: MockTest = {
      id: '',
      grade: 1,
      subjectId: subjects[0]?.id || '',
      topic: '',
      price: 99,
      questions: [],
    };
    setViewState({ view: 'edit_test', test: newTestTemplate });
  };

  const handleSaveSubject = (subjectToSave: Subject) => {
    setSubjects(prev => {
        const existing = prev.find(s => s.id === subjectToSave.id);
        if (existing) {
            return prev.map(s => s.id === subjectToSave.id ? subjectToSave : s);
        }
        return [...prev, { ...subjectToSave, id: `sub_${Date.now()}` }];
    });
  };

  const handleDeleteSubject = (subjectId: string) => {
    setAvailableTests(prev => prev.filter(t => t.subjectId !== subjectId));
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
  };


  const renderContent = () => {
    if (!currentUser) {
       if (authView === 'register') {
        return <RegistrationPage onRegister={handleRegister} onSwitchToLogin={switchToLogin} />;
      }
      return <LoginPage onLogin={handleLogin} onSwitchToRegister={switchToRegister} successMessage={loginSuccessMessage} />;
    }

    if (currentUser.role === 'admin') {
      if (viewState.view === 'edit_test') {
        return <TestEditor 
          test={viewState.test} 
          subjects={subjects} 
          onSave={handleSaveTest} 
          onCancel={handleBackToDashboard} 
        />;
      }
      return <AdminDashboard 
        tests={availableTests}
        subjects={subjects}
        onAddNewTest={handleAddNewTest}
        onEditTest={handleEditTest}
        onDeleteTest={handleDeleteTest}
        onSaveSubject={handleSaveSubject}
        onDeleteSubject={handleDeleteSubject}
      />
    }

    // Student View
    switch (viewState.view) {
      case 'profile':
        return <UserProfile user={currentUser} onUpdateProfile={handleUpdateProfile} onBack={handleBackToDashboard} />;
      case 'instructions':
        return <TestInstructions test={viewState.test} subjects={subjects} onBeginTest={handleBeginTest} onBack={handleBackToDashboard} />;
      case 'test_runner':
        return <TestRunner test={viewState.test} subjects={subjects} onTestComplete={handleTestComplete} />;
      case 'result':
        return <TestResult attempt={viewState.attempt} onBackToDashboard={handleBackToDashboard} onViewAnalysis={() => handleViewAnalysis(viewState.attempt)} />;
      case 'analysis':
        return <TestAnalysis attempt={viewState.attempt} onBack={handleBackToDashboard} />;
      case 'dashboard':
      default:
        return (
          <Dashboard
            user={currentUser as Student}
            availableTests={availableTests}
            subjects={subjects}
            onPurchase={handlePurchase}
            onStartTest={handleStartTest}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-content bg-slate-50">
      {currentUser && <Header user={currentUser} onLogout={handleLogout} onNavigateToProfile={handleNavigateToProfile} />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;