package smtcl.mocs.web.webservice.model;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class RunMeJob1 extends QuartzJobBean{
	private MachineToolUpdateFreq machineToolUpdateFreq;
	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		// TODO Auto-generated method stub
		machineToolUpdateFreq.makeToZero();
	}
	public void setMachineToolUpdateFreq(MachineToolUpdateFreq machineToolUpdateFreq) {
		this.machineToolUpdateFreq = machineToolUpdateFreq;
	}
}
