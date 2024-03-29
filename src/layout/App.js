import React, { useState, useEffect } from 'react';

import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { JWTProvider } from '../contexts/JWTContext';
import { FolderProvider } from '../contexts/FolderContext';
import { ProjectProvider } from '../contexts/ProjectContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { ViewProvider } from '../contexts/ViewContext';
import { ConfirmPopupProvider } from '../contexts/ConfirmPopupContext';
import theme from './../themes';
import Routes from '../Routes';
import NavigationScroll from './NavigationScroll';
import Snackbar from '../component/Snackbar';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { BookingProvider } from './../contexts/BookingContext';
import { AccountProvider } from '../contexts/AccountContext';
import { PartnerProvider } from '../contexts/PartnerContext';
import { TaskProvider } from '../contexts/TaskContext.js';
import { DepartmentProvider } from '../contexts/DepartmentContext';
import { RoleProvider } from '../contexts/RoleContext';
import { BatchProvider } from './../contexts/BatchContext';
import { ChartProvider } from './../contexts/ChartContext';
import { MediaProvider } from './../contexts/MediaContext';
import { ShareProvider } from './../contexts/ShareContext';
import { MetaDataProvider } from './../contexts/MetaDataContext';
import { MarketingProvider } from './../contexts/MarketingContext';
import { EventProvider } from './../contexts/EventContext';
import { EventCategoryProvider } from './../contexts/EventCategoryContext';
import { PaymentProvider } from '../contexts/PaymentContext.js';
import { CollaboratorProvider } from '../contexts/CollaboratorContext';
import { ProcessRoleProvider } from '../contexts/ProcessRoleContext.js';
import { DocumentProvider } from '../contexts/DocumentContext.js';
import { NotificationProvider } from '../contexts/NotificationContex.js';
import { OrderProvider } from '../contexts/OrderContext';
import { SaleProvider } from '../contexts/SaleContext';
import { SiteProvider } from './../contexts/SiteContext';
import { UniversityProvider } from './../contexts/UniversityContext';
import { CareerProvider } from '../contexts/CareerContext';
import { BannerProvider } from '../contexts/BannerContext';
import { CounsellingCategoryProvider } from '../contexts/CounsellingCategoryContext';
function loadLocaleData(locale) {
  switch (locale) {
    case 'fr':
      return import('./../compiled-lang/fr.json');
    case 'ro':
      return import('./../compiled-lang/ro.json');
    case 'zh':
      return import('./../compiled-lang/zh.json');
    default:
      return import('./../compiled-lang/en.json');
  }
}

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const App = () => {
  const customization = useSelector((state) => state.customization);
  const [messages, setMessages] = useState();
  const { selectedApp } = useSelector((state) => state.app);
  const [menu,setMenu] = React.useState({openClick:false,id:''})
  useEffect(() => {
    loadLocaleData(customization.locale).then((d) => {
      setMessages(d.default);
    });
  }, [customization]);
  const handleAutoClick = () => {
    setTimeout(function() {
      if (menu.openClick){
        try{
          document.getElementById(menu.id).click();
        }
        catch{
          document.getElementById(menu.id).click();
        }
        setMenu({...menu,openClick:false})
      }
  }, 1000);
   
    
    
  };
  React.useEffect(()=>{
    if(!selectedApp) return;
    if(!selectedApp?.menu_id) return;
    setMenu({openClick:true,id:selectedApp.menu_id})
  },[selectedApp])
  return (<>
    <React.Fragment>
      {messages && (
        <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
          <CssBaseline />
          <NavigationScroll>
            <StylesProvider jss={jss}>
              <ThemeProvider theme={theme(customization)}>
                <LoadingProvider>
                  <ConfirmPopupProvider>
                    <JWTProvider>
                      <ViewProvider>
                        <ProjectProvider>
                          <FolderProvider>
                            <TaskProvider>
                              <BookingProvider>
                                <AccountProvider>
                                  <PartnerProvider>
                                    <DepartmentProvider>
                                      <BatchProvider>
                                        <ChartProvider>
                                          <RoleProvider>
                                            <MediaProvider>
                                              <ShareProvider>
                                                <MetaDataProvider>
                                                  <MarketingProvider>
                                                    <EventProvider>
                                                      <EventCategoryProvider>
                                                        <PaymentProvider>
                                                          <ProcessRoleProvider>
                                                            <DocumentProvider>
                                                              <CollaboratorProvider>
                                                                <NotificationProvider>
                                                                  <SaleProvider>
                                                                    <OrderProvider>
                                                                      <SiteProvider>
                                                                        <BannerProvider>
                                                                          <UniversityProvider>
                                                                            <DepartmentProvider>
                                                                              <CareerProvider>
                                                                                <CounsellingCategoryProvider>
                                                                                  <Routes />
                                                                                  <Snackbar />
                                                                                </CounsellingCategoryProvider>
                                                                              </CareerProvider>
                                                                            </DepartmentProvider>
                                                                          </UniversityProvider>
                                                                        </BannerProvider>
                                                                      </SiteProvider>
                                                                    </OrderProvider>
                                                                  </SaleProvider>
                                                                </NotificationProvider>
                                                              </CollaboratorProvider>
                                                            </DocumentProvider>
                                                          </ProcessRoleProvider>
                                                        </PaymentProvider>
                                                      </EventCategoryProvider>
                                                    </EventProvider>
                                                  </MarketingProvider>
                                                </MetaDataProvider>
                                              </ShareProvider>
                                            </MediaProvider>
                                          </RoleProvider>
                                        </ChartProvider>
                                      </BatchProvider>
                                    </DepartmentProvider>
                                  </PartnerProvider>
                                </AccountProvider>
                              </BookingProvider>
                            </TaskProvider>
                          </FolderProvider>
                        </ProjectProvider>
                      </ViewProvider>
                    </JWTProvider>
                  </ConfirmPopupProvider>
                </LoadingProvider>
              </ThemeProvider>
            </StylesProvider>
          </NavigationScroll>
        </IntlProvider>
      )}

    </React.Fragment>
       {handleAutoClick()}
       </>
  );
};

export default App;
